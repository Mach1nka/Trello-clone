import {
  DataForCreatingColumn,
  DataForRenamingColumn,
  DataForUpdatingColumnPos,
  DataForDeletingColumn,
  Column,
} from '../model/column.model';
import { BaseResponse } from 'services/HttpService/types';
import { httpService } from 'services/HttpService';

const getColumns = (boardId: string): Promise<BaseResponse<Column[]>> =>
  httpService.get<Column[]>({
    url: '/columns',
    params: boardId,
  });

const createColumn = (
  data: DataForCreatingColumn
): Promise<BaseResponse<Column>> =>
  httpService.post<DataForCreatingColumn, Column>({ url: '/column', data });

const updateColumnName = (
  data: DataForRenamingColumn
): Promise<BaseResponse<Column>> =>
  httpService.patch<DataForRenamingColumn, Column>({
    url: '/column/name',
    data,
  });

const updateColumnPosition = (
  data: DataForUpdatingColumnPos
): Promise<BaseResponse<Column[]>> =>
  httpService.put<DataForUpdatingColumnPos, Column[]>({
    url: '/column/position',
    data,
  });

const deleteColumn = (
  data: DataForDeletingColumn
): Promise<BaseResponse<Column[]>> => {
  return httpService
    .delete<DataForDeletingColumn, Record<string, never>>({
      url: '/column',
      data,
    })
    .then(() => getColumns(data.boardId));
};

export {
  getColumns,
  createColumn,
  updateColumnName,
  updateColumnPosition,
  deleteColumn,
};
