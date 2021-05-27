import { serverURL } from './api-data';
import {
  DataForRenamingBoard,
  DataForCreatingBoard,
  DataForDeletingBoard
} from '../store/board/actions';
import { requestHeader, responseHandler } from './constants';

const getBoards = (): Promise<Response> =>
  fetch(`${serverURL}/boards`, {
    method: 'GET',
    headers: requestHeader()
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);

const updateBoardData = (
  data: DataForRenamingBoard | DataForCreatingBoard | DataForDeletingBoard,
  reqMethod: string
): Promise<Response> =>
  fetch(`${serverURL}/board`, {
    method: reqMethod,
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);

const createBoard = (data: DataForCreatingBoard): Promise<Response> =>
  updateBoardData(data, 'POST');

const updateBoardName = (data: DataForRenamingBoard): Promise<Response> =>
  updateBoardData(data, 'PATCH');

const deleteBoard = (data: DataForDeletingBoard): Promise<Response> =>
  updateBoardData(data, 'DELETE');

export { getBoards, createBoard, updateBoardName, deleteBoard };
