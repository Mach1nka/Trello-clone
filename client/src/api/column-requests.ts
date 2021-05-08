import { serverURL } from './api-data';
import {
  DataForCreatingColumn,
  DataForRenamingColumn,
  DataForUpdatingColumnPos,
  DataForDeletingColumn
} from '../store/column/actions';
import getToken from '../../utils/get-token';

function getColumns(boardId: string): Promise<Response> {
  const authToken = getToken();
  return fetch(`${serverURL}/columns/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authToken
    }
  })
    .then((resp) => (resp.status === 401 ? resp.status : resp.json()))
    .catch((error) => error);
}

function createColumn(data: DataForCreatingColumn): Promise<Response> {
  const authToken = getToken();
  return fetch(`${serverURL}/column`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authToken
    },
    body: JSON.stringify(data)
  })
    .then((resp) => (resp.status === 401 ? resp.status : resp.json()))
    .catch((error) => error);
}

function updateColumnName(data: DataForRenamingColumn): Promise<Response> {
  const authToken = getToken();
  return fetch(`${serverURL}/column/name`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authToken
    },
    body: JSON.stringify(data)
  })
    .then((resp) => (resp.status === 401 ? resp.status : resp.json()))
    .catch((error) => error);
}

function updateColumnPosition(data: DataForUpdatingColumnPos): Promise<Response> {
  const authToken = getToken();
  return fetch(`${serverURL}/column/position`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authToken
    },
    body: JSON.stringify(data)
  })
    .then((resp) => (resp.status === 401 ? resp.status : resp.json()))
    .catch((error) => error);
}

function deleteColumn(data: DataForDeletingColumn): Promise<Response> {
  const authToken = getToken();
  return fetch(`${serverURL}/column`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: authToken
    },
    body: JSON.stringify(data)
  })
    .then((resp) => (resp.status === 401 ? resp.status : resp.json()))
    .catch((error) => error);
}

export { getColumns, createColumn, updateColumnName, updateColumnPosition, deleteColumn };
