import { BaseResponse } from '../store/board/types';
import {
  DataForCreatingCard,
  DataForRenamingCard,
  DataForUpdatingCardDesc,
  DataForUpdatingCardPos,
  DataForUpdatingCardStatus,
  DataForDeletingCard,
  CardList,
  Card
} from '../store/card/types';
import { httpService, requestHeader } from './utils';

const getCards = (columnId: string): Promise<BaseResponse<CardList>> =>
  httpService.get({ url: '/cards', params: columnId, headersConfig: requestHeader() });

const createCard = (data: DataForCreatingCard): Promise<BaseResponse<Card>> =>
  httpService.post({ url: '/card', data, headersConfig: requestHeader() });

const updateCardName = (data: DataForRenamingCard): Promise<BaseResponse<Card>> =>
  httpService.patch({ url: '/card/name', data });

const updateCardDescription = (data: DataForUpdatingCardDesc): Promise<BaseResponse<Card>> =>
  httpService.patch({ url: '/card/description', data });

const updateCardPosition = (data: DataForUpdatingCardPos): Promise<BaseResponse<CardList>> =>
  httpService.put({ url: '/card/position', data });

const updateCardStatus = (
  data: DataForUpdatingCardStatus
): Promise<BaseResponse<Record<string, never>>> => httpService.put({ url: '/card/status', data });

const deleteCard = (data: DataForDeletingCard): Promise<BaseResponse<Record<string, never>>> =>
  httpService.delete({ url: '/card', data });

export {
  getCards,
  createCard,
  updateCardName,
  updateCardDescription,
  updateCardPosition,
  updateCardStatus,
  deleteCard
};
