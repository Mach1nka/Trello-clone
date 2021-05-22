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

function createCard(data: DataForCreatingCard): Promise<Response> {
  return fetch(`${serverURL}/card`, {
    method: 'POST',
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function updateCardName(data: DataForRenamingCard): Promise<Response> {
  return fetch(`${serverURL}/card/name`, {
    method: 'PATCH',
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function updateCardDescription(data: DataForUpdatingCardDesc): Promise<Response> {
  return fetch(`${serverURL}/card/description`, {
    method: 'PATCH',
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function updateCardPosition(data: DataForUpdatingCardPos): Promise<Response> {
  return fetch(`${serverURL}/card/position`, {
    method: 'PUT',
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function updateCardStatus(data: DataForUpdatingCardStatus): Promise<Response> {
  return fetch(`${serverURL}/card/status`, {
    method: 'PUT',
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
}

function deleteCard(data: DataForDeletingCard): Promise<Response> {
  return fetch(`${serverURL}/card`, {
    method: 'DELETE',
    headers: requestHeader(),
    body: JSON.stringify(data)
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);
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
