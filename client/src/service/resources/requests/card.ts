import {
  Card,
  CardListServerResponse,
  DataForCreatingCard,
  DataForDeletingCard,
  DataForRenamingCard,
  DataForTransferring,
  DataForUpdatingCardDesc,
  DataForUpdatingCardPos
} from '../models/card.model';
import { BaseResponse } from '../../httpService/types';
import httpService from '../../httpService/index';
import { Empty } from '../models/common.model';

const getCards = (columnId: string): Promise<BaseResponse<CardListServerResponse>> =>
  httpService.get<CardListServerResponse>(`/cards/${columnId}`);

const createCard = (data: DataForCreatingCard): Promise<BaseResponse<Card>> =>
  httpService.post<Card, DataForCreatingCard>('/card', {}, data);

const updateCardName = (data: DataForRenamingCard): Promise<BaseResponse<Card>> =>
  httpService.patch<Card, DataForRenamingCard>('/card/name', {}, data);

const updateCardDescription = (data: DataForUpdatingCardDesc): Promise<BaseResponse<Card>> =>
  httpService.patch<Card, DataForUpdatingCardDesc>('/card/description', {}, data);

const updateCardPosition = (
  data: DataForUpdatingCardPos
): Promise<BaseResponse<CardListServerResponse>> =>
  httpService.put<CardListServerResponse, DataForUpdatingCardPos>('/card/position', {}, data);

const transferCard = (data: DataForTransferring): Promise<BaseResponse<Empty>> =>
  httpService.put<Empty, DataForTransferring>('/card/transfer', {}, data);

const deleteCard = (data: DataForDeletingCard): Promise<BaseResponse<Empty>> =>
  httpService.delete<Empty>(`/card/${data.cardId}/${data.columnId}`);

export {
  getCards,
  createCard,
  updateCardName,
  updateCardDescription,
  updateCardPosition,
  transferCard,
  deleteCard
};
