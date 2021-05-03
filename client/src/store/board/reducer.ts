import { PUT_USER_BOARDS, PUT_RENAMED_BOARD, BoardList } from './actions';

const userBoardsIS: BoardList = {
  boards: []
};

const userBoards = (
  state = userBoardsIS,
  { type, payload }: { type: string; payload: BoardList }
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
        ...payload
      };
    default:
      return state;
  }
};

export default userBoards;
