import {
  DataForRenamingBoard,
  DataForCreatingBoard,
  DataForSharingBoard,
  DataForDeletingBoard,
  BoardListServerResponse,
  Board
} from '../models/board.model';
import { BaseResponse } from '../../httpService/types';
import httpService from '../../httpService/index';
import { Empty } from '../models/common.model';

const getBoards = (): Promise<BaseResponse<BoardListServerResponse>> =>
  httpService.get<BoardListServerResponse>('/boards');

const createBoard = (data: DataForCreatingBoard): Promise<BaseResponse<Board>> =>
  httpService.post<Board, DataForCreatingBoard>('/board', {}, data);

const updateBoardName = (data: DataForRenamingBoard): Promise<BaseResponse<Board>> =>
  httpService.patch<Board, DataForRenamingBoard>('/board/rename', {}, data);

const shareBoard = (data: DataForSharingBoard): Promise<BaseResponse<Empty>> =>
  httpService.patch<Empty, DataForSharingBoard>('/board/share', {}, data);

const deleteBoard = (data: DataForDeletingBoard): Promise<BaseResponse<Empty>> =>
  httpService.delete<Empty>(`/board/${data.boardId}`);

export { getBoards, createBoard, updateBoardName, shareBoard, deleteBoard };
