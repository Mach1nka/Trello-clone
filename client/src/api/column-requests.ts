import {
  DataForCreatingColumn,
  DataForRenamingColumn,
  DataForUpdatingColumnPos,
  DataForDeletingColumn
} from '../store/column/types';
import { httpService, requestHeader } from './utils';

const getColumns = (boardId: string): Promise<Response> =>
  httpService.get({ url: '/columns', params: boardId, headersConfig: requestHeader() });

const createColumn = (data: DataForCreatingColumn): Promise<Response> =>
  httpService.post({ url: '/column', data, headersConfig: requestHeader() });

const updateColumnName = (data: DataForRenamingColumn): Promise<Response> =>
  httpService.patch({ url: '/column/name', data });

const updateColumnPosition = (data: DataForUpdatingColumnPos): Promise<Response> =>
  httpService.put({ url: '/column/position', data });

const deleteColumn = (data: DataForDeletingColumn): Promise<Response> =>
  httpService.delete({ url: '/column', data });

export { getColumns, createColumn, updateColumnName, updateColumnPosition, deleteColumn };
