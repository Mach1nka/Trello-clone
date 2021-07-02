import {
  DataForCreatingCard,
  DataForRenamingCard,
  DataForUpdatingCardDesc,
  DataForUpdatingCardPos,
  DataForUpdatingCardStatus,
  DataForDeletingCard
} from '../store/card/types';
import { httpService, requestHeader } from './utils';

const getCards = (columnId: string): Promise<Response> =>
  httpService.get({ url: '/cards', params: columnId, headersConfig: requestHeader() });

const createCard = (data: DataForCreatingCard): Promise<Response> =>
  httpService.post({ url: '/card', data, headersConfig: requestHeader() });

const updateCardName = (data: DataForRenamingCard): Promise<Response> =>
  httpService.patch({ url: '/card/name', data });

const updateCardDescription = (data: DataForUpdatingCardDesc): Promise<Response> =>
  httpService.patch({ url: '/card/description', data });

const updateCardPosition = (data: DataForUpdatingCardPos): Promise<Response> =>
  httpService.put({ url: '/card/position', data });

const updateCardStatus = (data: DataForUpdatingCardStatus): Promise<Response> =>
  httpService.put({ url: '/card/status', data });

const deleteCard = (data: DataForDeletingCard): Promise<Response> =>
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
