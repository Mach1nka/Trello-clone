import { PUT_USER_BOARDS, PUT_RENAMED_BOARD, PUT_CREATED_BOARD, BoardList, Board } from './actions';
import replaceBoardName from '../../../utils/replace-board-name';

const userBoardsIS: BoardList = {
  boards: []
};

const userBoards = (
  state = userBoardsIS,
  { type, payload }: { type: string; payload: BoardList | Board }
): BoardList => {
  switch (type) {
    case PUT_USER_BOARDS:
      return {
        ...state,
        ...payload
      };
    case PUT_RENAMED_BOARD:
      return {
        ...state,
        boards: replaceBoardName(state, payload as Board)
      };
    case PUT_CREATED_BOARD:
      return {
        ...state,
        boards: state.boards.concat(payload as Board)
      };
    default:
      return state;
  }
};

export default userBoards;
