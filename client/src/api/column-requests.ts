import { serverURL } from './api-data';
import {
  DataForCreatingColumn,
  DataForRenamingColumn,
  DataForUpdatingColumnPos,
  DataForDeletingColumn
} from '../store/column/actions';
import { requestHeader, responseHandler } from './constants';

const getColumns = (boardId: string): Promise<Response> =>
  fetch(`${serverURL}/columns/${boardId}`, {
    method: 'GET',
    headers: requestHeader()
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);

const updateColumnData = (
  data:
    | DataForCreatingColumn
    | DataForRenamingColumn
    | DataForUpdatingColumnPos
    | DataForDeletingColumn,
  reqMethod: string,
  path = ''
): Promise<Response> =>
  fetch(`${serverURL}/column${path}`, {
    method: reqMethod,
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);

const createColumn = (data: DataForCreatingColumn): Promise<Response> =>
  updateColumnData(data, 'POST');

const updateColumnName = (data: DataForRenamingColumn): Promise<Response> =>
  updateColumnData(data, 'PATCH', '/name');

const updateColumnPosition = (data: DataForUpdatingColumnPos): Promise<Response> =>
  updateColumnData(data, 'PUT', '/position');

const deleteColumn = (data: DataForDeletingColumn): Promise<Response> =>
  updateColumnData(data, 'DELETE');

export { getColumns, createColumn, updateColumnName, updateColumnPosition, deleteColumn };
