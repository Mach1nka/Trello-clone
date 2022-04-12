import {
  Column,
  ColumnListServerResponse,
  DataForCreatingColumn,
  DataForDeletingColumn,
  DataForRenamingColumn,
  DataForRepositionColumn
} from '../models/column.model';
import { BaseResponse } from '../../httpService/types';
import httpService from '../../httpService/index';
import { Empty } from '../models/common.model';

const getColumns = (boardId: string): Promise<BaseResponse<ColumnListServerResponse>> =>
  httpService.get<ColumnListServerResponse>(`/columns/${boardId}`);

const createColumn = (data: DataForCreatingColumn): Promise<BaseResponse<Column>> =>
  httpService.post<Column, DataForCreatingColumn>('/column', {}, data);

const updateColumnName = (data: DataForRenamingColumn): Promise<BaseResponse<Column>> =>
  httpService.patch<Column, DataForRenamingColumn>('/column/name', {}, data);

const updateColumnPosition = (
  data: DataForRepositionColumn
): Promise<BaseResponse<ColumnListServerResponse>> =>
  httpService.put<ColumnListServerResponse, DataForRepositionColumn>('/column/position', {}, data);

const deleteColumn = (data: DataForDeletingColumn): Promise<BaseResponse<Empty>> =>
  httpService.delete<Empty>(`/column/${data.columnId}/${data.boardId}`);

export { getColumns, createColumn, updateColumnName, updateColumnPosition, deleteColumn };
