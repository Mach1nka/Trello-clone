import { Board, BoardList } from '../src/store/board/actions';

const replaceBoardName = (state: BoardList, payload: Board): Board[] =>
  state.boards.map((el) => (el.id === payload.id ? { id: payload.id, name: payload.name } : el));

export default replaceBoardName;
