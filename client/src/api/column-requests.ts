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

function updateColumnData(
  data:
    | DataForCreatingColumn
    | DataForRenamingColumn
    | DataForUpdatingColumnPos
    | DataForDeletingColumn,
  reqMethod: string,
  path = ''
): Promise<Response> {
  return fetch(`${serverURL}/column${path}`, {
    method: reqMethod,
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

export { getColumns, updateColumnData };
