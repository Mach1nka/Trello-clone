import {
  DataForRenamingBoard,
  DataForCreatingBoard,
  DataForDeletingBoard
} from '../store/board/types';
import { requestHeader, httpService } from './utils';

const getBoards = (): Promise<Response> =>
  httpService.get({ url: '/boards', params: '', headersConfig: requestHeader() });

const createBoard = (data: DataForCreatingBoard): Promise<Response> =>
  httpService.post({ url: '/board', data, headersConfig: requestHeader() });

const updateBoardName = (data: DataForRenamingBoard): Promise<Response> =>
  httpService.patch({ url: '/board/rename', data });

const shareBoard = (data: DataForDeletingBoard): Promise<Response> =>
  httpService.patch({ url: '/board/share', data });

const deleteBoard = (data: DataForDeletingBoard): Promise<Response> =>
  httpService.delete({ url: '/board', data });

export { getBoards, createBoard, updateBoardName, shareBoard, deleteBoard };
