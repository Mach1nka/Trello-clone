import {
  DataForCreatingBoard,
  DataForRenamingBoard,
  DataForDeletingBoard,
  DataForSharingBoard,
  Board,
  BoardDataServer,
} from '../model/board.model';
import { BaseResponse } from 'services/HttpService/types';
import { httpService } from 'services/HttpService';

const getBoards = (): Promise<BaseResponse<BoardDataServer>> =>
  httpService.get<BoardDataServer>({ url: '/boards', params: '' });

const createBoard = (
  boardData: DataForCreatingBoard
): Promise<BaseResponse<Board>> =>
  httpService.post<DataForCreatingBoard, Board>({
    url: '/board',
    data: boardData,
  });

const updateBoardName = (
  boardData: DataForRenamingBoard
): Promise<BaseResponse<Board>> =>
  httpService.patch<DataForRenamingBoard, Board>({
    url: '/board/rename',
    data: boardData,
  });

const shareBoard = (
  boardData: DataForSharingBoard
): Promise<BaseResponse<Record<string, never>>> =>
  httpService.patch<DataForSharingBoard, Record<string, never>>({
    url: '/board/share',
    data: boardData,
  });

const deleteBoard = (
  boardData: DataForDeletingBoard
): Promise<BaseResponse<BoardDataServer>> =>
  httpService
    .delete<DataForDeletingBoard, Record<string, never>>({
      url: '/board',
      data: boardData,
    })
    .then(() => getBoards());

export { getBoards, createBoard, updateBoardName, shareBoard, deleteBoard };
