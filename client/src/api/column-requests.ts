import { serverURL } from './api-data';
import {
  DataForCreatingColumn,
  DataForRenamingColumn,
  DataForUpdatingColumnPos,
  DataForDeletingColumn
} from '../store/column/actions';
import { requestHeader, responseHandler } from './constants';

function getColumns(boardId: string): Promise<Response> {
  return fetch(`${serverURL}/columns/${boardId}`, {
    method: 'GET',
    headers: requestHeader()
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function createColumn(data: DataForCreatingColumn): Promise<Response> {
  return fetch(`${serverURL}/column`, {
    method: 'POST',
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function updateColumnName(data: DataForRenamingColumn): Promise<Response> {
  return fetch(`${serverURL}/column/name`, {
    method: 'PATCH',
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function updateColumnPosition(data: DataForUpdatingColumnPos): Promise<Response> {
  return fetch(`${serverURL}/column/position`, {
    method: 'PATCH',
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function deleteColumn(data: DataForDeletingColumn): Promise<Response> {
  return fetch(`${serverURL}/column`, {
    method: 'DELETE',
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

export { getColumns, createColumn, updateColumnName, updateColumnPosition, deleteColumn };
