import { serverURL } from './api-data';
import {
  DataForRenamingBoard,
  DataForCreatingBoard,
  DataForDeletingBoard
} from '../store/board/actions';
import { requestHeader, responseHandler } from './constants';

function getBoards(): Promise<Response> {
  return fetch(`${serverURL}/boards`, {
    method: 'GET',
    headers: requestHeader()
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function updateBoardData(
  data: DataForRenamingBoard | DataForCreatingBoard | DataForDeletingBoard,
  reqMethod: string
): Promise<Response> {
  return fetch(`${serverURL}/board`, {
    method: reqMethod,
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

export { getBoards, updateBoardData };
