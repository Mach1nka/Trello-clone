import { serverURL } from './api-data';
import { DataForRenamingBoard, DataForCreatingBoard } from '../store/board/actions';
import getToken from '../../utils/get-token';

function getBoards(): Promise<Response> {
  const authToken = getToken();
  return fetch(`${serverURL}/boards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authToken
    }
  })
    .then((resp) => resp.json())
    .catch((error) => error);
}

function createBoard(data: DataForCreatingBoard): Promise<Response> {
  const authToken = getToken();
  return fetch(`${serverURL}/board`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authToken
    },
    body: JSON.stringify(data)
  })
    .then((resp) => resp.json())
    .catch((error) => error);
}

function updateBoardName(data: DataForRenamingBoard): Promise<Response> {
  const authToken = getToken();
  return fetch(`${serverURL}/board`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authToken
    },
    body: JSON.stringify(data)
  })
    .then((resp) => resp.json())
    .catch((error) => error);
}

function deleteBoard(data: { userId: string; boardId: string }): Promise<Response> {
  const authToken = getToken();
  return fetch(`${serverURL}/board`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authToken
    },
    body: JSON.stringify(data)
  })
    .then((resp) => resp.json())
    .catch((error) => error);
}

export { getBoards, createBoard, updateBoardName, deleteBoard };
