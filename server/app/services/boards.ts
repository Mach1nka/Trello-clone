import { boardRepository, userRepository } from '../database/repositories';
import { Board } from '../entities/board';
import { User } from '../entities/user';
import NotFound from '../../utils/errors/not-found';
import BadRequest from '../../utils/errors/bad-request';
import RefusalInAccess from '../../utils/errors/refusal-in-access';
import {
  AccessibleBoardsResponse,
  BodyForCreating,
  BodyForDeleting,
  BodyForRenaming,
  BodyForSharing,
  UserPermission
} from '../../types/boards/interfaces';
import { UserId, UserRole } from '../../types/auth/interfaces';

const getBoardsService = async (data: UserId): Promise<AccessibleBoardsResponse> => {
  const { userId } = data;
  const ownBoards: Board[] = await boardRepository().find({ where: { owner: { id: userId } } });
  const sharedBoards: Board[] = await boardRepository()
    .createQueryBuilder('boards')
    .innerJoin('boards.users', 'users')
    .where('users.id = :id', { id: userId })
    .getMany();

  return { ownBoards, sharedBoards };
};

const createBoardService = async (data: BodyForCreating & UserId): Promise<Board> => {
  const { name, userId } = data;

  const owner: User | undefined = await userRepository().findOne(userId);

  if (!owner) {
    throw new NotFound('The User does not exist');
  }

  const createdBoard = await boardRepository().save({
    name,
    owner
  });

  return createdBoard;
};

const updateNameService = async (
  data: BodyForRenaming & UserId & UserPermission
): Promise<Board> => {
  const { boardId, userId, newName, userRole } = data;

  if (userRole !== UserRole.Owner) {
    throw new RefusalInAccess();
  }

  const board: Board | undefined = await boardRepository().findOne(boardId, {
    relations: ['owner'],
    where: {
      owner: {
        id: userId
      }
    }
  });

  if (!board) {
    throw new NotFound('Board does not exist');
  }

  const updatedBoard: Board = await boardRepository().save({ ...board, name: newName });

  return updatedBoard;
};

const shareBoardService = async (data: BodyForSharing & UserPermission): Promise<void> => {
  const { boardId, newParticipantId, userRole } = data;

  if (userRole !== UserRole.Owner) {
    throw new RefusalInAccess();
  }

  const board: Board | undefined = await boardRepository().findOne(boardId, {
    relations: ['users', 'owner']
  });
  const newParticipant: User | undefined = await userRepository().findOne(newParticipantId);

  if (!board || !newParticipant) {
    throw new NotFound('Board or User does not exist');
  }

  if (board.owner.id === newParticipantId) {
    throw new BadRequest();
  }

  board.users.push(newParticipant);
  await boardRepository().save(board);
};

const deleteService = async (data: BodyForDeleting & UserId & UserPermission): Promise<void> => {
  const { boardId, userId, userRole } = data;

  const board: Board | undefined = await boardRepository().findOne(boardId, {
    relations: ['owner', 'users']
  });

  if (!board) {
    throw new NotFound('Board does not exist');
  }

  if (userRole === UserRole.Owner) {
    await boardRepository().remove(board);
    return;
  }

  board.users = board.users.filter((el: User) => el.id !== userId);
  await boardRepository().save(board);
};

export {
  getBoardsService,
  createBoardService,
  updateNameService,
  shareBoardService,
  deleteService
};
