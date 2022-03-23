import { boardRepository, userRepository } from '../database/repositories';
import { Board } from '../entities/board';
import { User } from '../entities/user';
import NotFound from '../../utils/errors/not-found';
import BadRequest from '../../utils/errors/bad-request';
import {
  AccessibleBoardsResponse,
  BodyForCreating,
  BodyForDeleting,
  BodyForRenaming,
  BodyForSharing
} from '../../types/boards/interfaces';
import { UserId } from '../../types/auth/interfaces';

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

const updateNameService = async (data: BodyForRenaming & UserId): Promise<Board> => {
  const { boardId, userId, newName } = data;
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

const shareBoardService = async (data: BodyForSharing): Promise<void> => {
  const { boardId, newParticipantId } = data;

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

const deleteService = async (data: BodyForDeleting & UserId): Promise<void> => {
  const { boardId, userId } = data;
  const board: Board | undefined = await boardRepository().findOne(boardId, {
    relations: ['owner', 'users']
  });

  if (!board) {
    throw new NotFound('Board does not exist');
  }

  const isOwner = board.owner.id === userId;
  const isParticipant = board.users.some((el: User) => el.id === userId);

  if (!isOwner && !isParticipant) {
    throw new BadRequest('The User does not have access to the board');
  }

  if (isOwner) {
    await boardRepository().remove(board);
    return;
  }

  if (isParticipant) {
    board.users = board.users.filter((el: User) => el.id !== userId);
    await boardRepository().save(board);
  }
};

export {
  getBoardsService,
  createBoardService,
  updateNameService,
  shareBoardService,
  deleteService
};
