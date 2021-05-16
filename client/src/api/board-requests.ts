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

function createBoard(data: DataForCreatingBoard): Promise<Response> {
  return fetch(`${serverURL}/board`, {
    method: 'POST',
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function updateBoardName(data: DataForRenamingBoard): Promise<Response> {
  return fetch(`${serverURL}/board`, {
    method: 'PATCH',
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function deleteBoard(data: DataForDeletingBoard): Promise<Response> {
  return fetch(`${serverURL}/board`, {
    method: 'DELETE',
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

export { getBoards, createBoard, updateBoardName, deleteBoard };
