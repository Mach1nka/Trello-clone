import { serverURL } from './api-data';
import store from '../store/store';
import { DataForRenamingBoard, DataForCreatingBoard } from '../store/board/saga';

const state = store.getState();
const authToken = state.authData.token;

function getBoards(): Promise<Response> {
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

function deleteBoard(data: { userId: string; boardId: string }): Promise<Response> {
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
