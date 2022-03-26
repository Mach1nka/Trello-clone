import { Response, NextFunction } from 'express';
import { CustomRequest } from '../../types/common';
import getUserPayload from '../../utils/get-user-payload';
import RefusalInAccess from '../../utils/errors/refusal-in-access';
import { Board } from '../entities/board';
import { User } from '../entities/user';
import { boardRepository } from '../database/repositories';
import { UserRole } from '../../types/auth/interfaces';

const userPermission = async (
  req: CustomRequest<{ boardId?: string }>,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { boardId } = req.body;
  const { userId } = getUserPayload(req);

  if (!boardId) {
    next();
  }

  const board: Board | undefined = await boardRepository().findOne(boardId, {
    relations: ['owner', 'users']
  });

  const isOwner = board?.owner.id === userId;
  const isParticipant = board?.users.some((el: User) => el.id === userId);

  if (!isOwner && !isParticipant) {
    throw new RefusalInAccess('The User does not have access to the board');
  }

  if (isOwner) {
    req.userRole = UserRole.Owner;
    next();
  }

  if (isParticipant) {
    req.userRole = UserRole.Participant;
    next();
  }
};

export default userPermission;
