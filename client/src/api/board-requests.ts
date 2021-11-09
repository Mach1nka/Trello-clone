import {
  DataForRenamingBoard,
  DataForCreatingBoard,
  DataForDeletingBoard,
  BaseResponse,
  BoardList,
  Board
} from '../store/board/types';
import { requestHeader, httpService } from './utils';

const getBoards = (): Promise<BaseResponse<BoardList>> =>
  httpService.get({ url: '/boards', params: '', headersConfig: requestHeader() });

const createBoard = (data: DataForCreatingBoard): Promise<BaseResponse<Board>> =>
  httpService.post({ url: '/board', data, headersConfig: requestHeader() });

const updateBoardName = (data: DataForRenamingBoard): Promise<BaseResponse<Board>> =>
  httpService.patch({ url: '/board/rename', data });

const shareBoard = (data: DataForDeletingBoard): Promise<BaseResponse<Record<string, never>>> =>
  httpService.patch({ url: '/board/share', data });

const deleteBoard = (data: DataForDeletingBoard): Promise<BaseResponse<Record<string, never>>> =>
  httpService.delete({ url: '/board', data });

export { getBoards, createBoard, updateBoardName, shareBoard, deleteBoard };
