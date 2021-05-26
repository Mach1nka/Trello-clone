import { serverURL } from './api-data';
import {
  DataForCreatingCard,
  DataForRenamingCard,
  DataForUpdatingCardDesc,
  DataForUpdatingCardPos,
  DataForUpdatingCardStatus,
  DataForDeletingCard
} from '../store/card/actions';
import { requestHeader, responseHandler } from './constants';

function getCards(columnId: string): Promise<Response> {
  return fetch(`${serverURL}/cards/${columnId}`, {
    method: 'GET',
    headers: requestHeader()
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function updateCardData(
  data:
    | DataForCreatingCard
    | DataForRenamingCard
    | DataForUpdatingCardDesc
    | DataForUpdatingCardPos
    | DataForUpdatingCardStatus
    | DataForDeletingCard,
  reqMethod: string,
  path = ''
): Promise<Response> {
  return fetch(`${serverURL}/card${path}`, {
    method: reqMethod,
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function createCard(data: DataForCreatingCard): Promise<Response> {
  return updateCardData(data, 'POST');
}

function updateCardName(data: DataForRenamingCard): Promise<Response> {
  return updateCardData(data, 'PATCH', '/name');
}

function updateCardDescription(data: DataForUpdatingCardDesc): Promise<Response> {
  return updateCardData(data, 'PATCH', '/description');
}

function updateCardPosition(data: DataForUpdatingCardPos): Promise<Response> {
  return updateCardData(data, 'PUT', '/position');
}

function updateCardStatus(data: DataForUpdatingCardStatus): Promise<Response> {
  return updateCardData(data, 'PUT', '/status');
}

function deleteCard(data: DataForDeletingCard): Promise<Response> {
  return updateCardData(data, 'DELETE');
}

export {
  getCards,
  createCard,
  updateCardName,
  updateCardDescription,
  updateCardPosition,
  updateCardStatus,
  deleteCard
};
