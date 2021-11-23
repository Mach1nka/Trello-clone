import {
  DataForCreatingCard,
  DataForRenamingCard,
  DataForUpdatingCardDesc,
  DataForUpdatingCardPos,
  DataForUpdatingCardStatus,
  DataForDeletingCard,
  Card,
  CardDataServer,
} from '../model/card.model';
import { BaseResponse } from 'services/HttpService/types';
import { httpService } from 'services/HttpService';

const getCards = (columnId: string): Promise<BaseResponse<CardDataServer>> =>
  httpService.get<CardDataServer>({ url: '/cards', params: columnId });

const createCard = (data: DataForCreatingCard): Promise<BaseResponse<Card>> =>
  httpService.post<DataForCreatingCard, Card>({ url: '/card', data });

const updateCardName = (
  data: DataForRenamingCard
): Promise<BaseResponse<Card>> =>
  httpService.patch<DataForRenamingCard, Card>({ url: '/card/name', data });

const updateCardDescription = (
  data: DataForUpdatingCardDesc
): Promise<BaseResponse<Card>> =>
  httpService.patch<DataForUpdatingCardDesc, Card>({
    url: '/card/description',
    data,
  });

const updateCardPosition = (
  data: DataForUpdatingCardPos
): Promise<BaseResponse<CardDataServer>> =>
  httpService.put<DataForUpdatingCardPos, CardDataServer>({
    url: '/card/position',
    data,
  });

const updateCardStatus = (
  data: DataForUpdatingCardStatus
): Promise<
  BaseResponse<{ oldColumn: CardDataServer; newColumn: CardDataServer }>
> =>
  httpService
    .put<DataForUpdatingCardStatus, BaseResponse<Record<string, never>>>({
      url: '/card/status',
      data,
    })
    .then(() => getCards(data.columnId))
    .then((oldColumnResp: BaseResponse<CardDataServer>) => {
      return getCards(data.newColumnId).then(
        (newColumnResp: BaseResponse<CardDataServer>) => {
          return {
            statusCode: newColumnResp.statusCode,
            data: {
              oldColumn: oldColumnResp.data,
              newColumn: newColumnResp.data,
            },
          };
        }
      );
    });

const deleteCard = (
  data: DataForDeletingCard
): Promise<BaseResponse<CardDataServer>> =>
  httpService
    .delete<DataForDeletingCard, Record<string, never>>({ url: '/card', data })
    .then(() => getCards(data.columnId));

export {
  getCards,
  createCard,
  updateCardName,
  updateCardDescription,
  updateCardPosition,
  updateCardStatus,
  deleteCard,
};
