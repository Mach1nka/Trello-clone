import { Dispatch } from '@reduxjs/toolkit';
import { BaseResponse } from '../src/service/httpService/types';
import { SliceName } from '../src/service/resources/models/common.model';
import getThunkHelper from './thunk-helper';

interface EntityHelperProps<T, R> {
  sliceName: SliceName;
  actionType: string;
  fetchData: T;
  fetchFn: (args: T) => Promise<BaseResponse<R>>;
  dispatch: Dispatch<any>;
}

const dispatchEntityHelper = <T, R>({
  sliceName,
  actionType,
  fetchData,
  fetchFn,
  dispatch
}: EntityHelperProps<T, R>) => {
  const typePrefix = `${sliceName}/${actionType}`;
  const thunk = getThunkHelper<T, R>({ typePrefix });

  return dispatch(thunk({ fetchFn, fetchData }));
};

export default dispatchEntityHelper;
