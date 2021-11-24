import { BaseResponse } from '../store/board/types';
import {
  DataForCreatingColumn,
  DataForRenamingColumn,
  DataForUpdatingColumnPos,
  DataForDeletingColumn,
  Column
} from '../store/column/types';
import { httpService, requestHeader } from './utils';

const getColumns = (boardId: string): Promise<BaseResponse<Column[]>> =>
  httpService.get({ url: '/columns', params: boardId, headersConfig: requestHeader() });

const createColumn = (data: DataForCreatingColumn): Promise<BaseResponse<Column>> =>
  httpService.post({ url: '/column', data, headersConfig: requestHeader() });

const updateColumnName = (data: DataForRenamingColumn): Promise<BaseResponse<Column>> =>
  httpService.patch({ url: '/column/name', data });

const updateColumnPosition = (data: DataForUpdatingColumnPos): Promise<BaseResponse<Column[]>> =>
  httpService.put({ url: '/column/position', data });

const deleteColumn = (data: DataForDeletingColumn): Promise<BaseResponse<Record<string, never>>> =>
  httpService.delete({ url: '/column', data });

export { getColumns, createColumn, updateColumnName, updateColumnPosition, deleteColumn };
