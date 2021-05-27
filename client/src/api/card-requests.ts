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

const getCards = (columnId: string): Promise<Response> =>
  fetch(`${serverURL}/cards/${columnId}`, {
    method: 'GET',
    headers: requestHeader()
  })
    .then((resp) => responseHandler(resp))
    .catch((error) => error);

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

const createCard = (data: DataForCreatingCard): Promise<Response> => updateCardData(data, 'POST');

const updateCardName = (data: DataForRenamingCard): Promise<Response> =>
  updateCardData(data, 'PATCH', '/name');

const updateCardDescription = (data: DataForUpdatingCardDesc): Promise<Response> =>
  updateCardData(data, 'PATCH', '/description');

const updateCardPosition = (data: DataForUpdatingCardPos): Promise<Response> =>
  updateCardData(data, 'PUT', '/position');

const updateCardStatus = (data: DataForUpdatingCardStatus): Promise<Response> =>
  updateCardData(data, 'PUT', '/status');

const deleteCard = (data: DataForDeletingCard): Promise<Response> => updateCardData(data, 'DELETE');

export {
  getCards,
  createCard,
  updateCardName,
  updateCardDescription,
  updateCardPosition,
  updateCardStatus,
  deleteCard
};
