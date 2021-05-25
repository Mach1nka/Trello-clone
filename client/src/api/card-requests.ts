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

export { getCards, updateCardData };
