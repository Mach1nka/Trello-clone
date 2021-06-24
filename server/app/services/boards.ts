import Board, { BoardsInDB } from '../models/board';
import Column from '../models/column';
import BadRequest from '../../utils/errors/bad-request';
import NotFound from '../../utils/errors/not-found';
import AlreadyExists from '../../utils/errors/already-exists';

interface FilteredBoard {
  id: string;
  name: string;
}

interface ReturnValue {
  filteredOwnBoardObj: FilteredBoard[];
  filteredSharedBoardObj: FilteredBoard[];
}

interface BodyForCreatBoard {
  name: string;
  userId: string;
}

interface BodyForRenameBoard {
  newName: string;
  userId: string;
  boardId: string;
}

interface BodyForShareDeleteBoard {
  newName: string;
  userId: string;
  boardId: string;
}

const getBoardsService = async (userId: string): Promise<ReturnValue> => {
  const ownBoards: BoardsInDB[] = await Board.find({ owner: userId });
  const sharedBoards: BoardsInDB[] = await Board.find().where('accessUsers').in([userId]);

  const filteredOwnBoardObj: FilteredBoard[] = ownBoards.length
    ? ownBoards.map((el) => ({
        id: String(el._id),
        name: el.name
      }))
    : [];

  const filteredSharedBoardObj: FilteredBoard[] = sharedBoards.length
    ? sharedBoards.map((el) => ({
        id: String(el._id),
        name: el.name
      }))
    : [];

  return { filteredOwnBoardObj, filteredSharedBoardObj };
};

const createBoardService = async (reqBody: BodyForCreatBoard): Promise<BoardsInDB> => {
  const { name, userId } = reqBody;

  const board = new Board({
    name,
    owner: userId
  });

  const createdBoard: BoardsInDB = await board.save();

  return createdBoard;
};

const updateBoardNameService = async (reqBody: BodyForRenameBoard): Promise<BoardsInDB> => {
  const { boardId, userId, newName } = reqBody;
  const board = await Board.findById(boardId);

  if (!board) {
    throw new NotFound();
  }

  const isOwnerId = board.owner.toString() === userId;

  if (!isOwnerId) {
    throw new BadRequest();
  }

  const updatedBoard = await Board.findByIdAndUpdate(boardId, { name: newName }, { new: true });

  if (!updatedBoard) {
    throw new BadRequest();
  }

  return updatedBoard;
};

const shareBoardService = async (reqBody: BodyForShareDeleteBoard): Promise<void> => {
  const { boardId, userId } = reqBody;
  const sharedBoard = await Board.findById(boardId);

  if (!sharedBoard) {
    throw new BadRequest();
  }

  const arrayOfAccessUsers = sharedBoard.accessUsers;

  const isUserExist = arrayOfAccessUsers.includes(userId);

  if (!sharedBoard) {
    throw new BadRequest();
  }

  if (isUserExist) {
    throw new AlreadyExists('', 409);
  }

  await Board.findByIdAndUpdate(boardId, { accessUsers: [...arrayOfAccessUsers, userId] });
};

const deleteBoardService = async (reqBody: BodyForShareDeleteBoard): Promise<void> => {
  const { boardId, userId } = reqBody;
  const board = await Board.findById(boardId);

  if (!board) {
    throw new NotFound();
  }

  const isOwnerId = board.owner.toString() === userId;

  if (isOwnerId) {
    await Column.findOneAndDelete({ boardId });
    await Board.findByIdAndDelete(boardId);
  } else {
    const updatedUsersArr = board.accessUsers.filter((el) => el.toString() !== userId);
    await Board.findByIdAndUpdate(boardId, { accessUsers: updatedUsersArr });
  }
};

export {
  getBoardsService,
  createBoardService,
  updateBoardNameService,
  shareBoardService,
  deleteBoardService
};
