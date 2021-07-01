import { serverURL } from '../../utils/constants';
import {
  DataForRenamingBoard,
  DataForCreatingBoard,
  DataForDeletingBoard
} from '../store/board/types';
import { requestHeader, responseHandler } from './utils';

const getBoards = (): Promise<Response> =>
  fetch(`${serverURL}/boards`, {
    method: 'GET',
    headers: requestHeader()
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);

const updateBoardData = (
  data: DataForRenamingBoard | DataForCreatingBoard | DataForDeletingBoard,
  reqMethod: string,
  path = ''
): Promise<Response> =>
  fetch(`${serverURL}/board${path}`, {
    method: reqMethod,
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);

const createBoard = (data: DataForCreatingBoard): Promise<Response> =>
  updateBoardData(data, 'POST');

const updateBoardName = (data: DataForRenamingBoard): Promise<Response> =>
  updateBoardData(data, 'PATCH', '/rename');

const shareBoard = (data: DataForDeletingBoard): Promise<Response> =>
  updateBoardData(data, 'PATCH', '/share');

const deleteBoard = (data: DataForDeletingBoard): Promise<Response> =>
  updateBoardData(data, 'DELETE');

export { getBoards, createBoard, updateBoardName, shareBoard, deleteBoard };
