import { CommonEntity } from '../src/service/resources/models/common.model';

const updateReduxEntity = <T extends CommonEntity>(state: T[], payload: T): T[] =>
  state.map((el) => (el.id === payload.id ? { ...payload } : el));

export default updateReduxEntity;
