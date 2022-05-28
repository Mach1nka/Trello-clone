import { Dispatch } from '@reduxjs/toolkit';
import { BaseResponse } from '../service/httpService/types';
import { SliceName } from '../service/resources/models/common.model';
import getThunkHelper from './thunk-helper';

interface EntityHelperProps<T, R> {
  sliceName: SliceName;
  actionType: string;
  fetchData: T;
  withLoading?: boolean;
  fetchFn: (args: T) => Promise<BaseResponse<R>>;
  dispatch: Dispatch<any>;
}

// NOTE: Function should be async because dispatch is async
const dispatchEntityHelper = async <T, R>({
  sliceName,
  actionType,
  fetchData,
  fetchFn,
  dispatch,
  withLoading = false
}: EntityHelperProps<T, R>) => {
  const typePrefix = `${sliceName}/${actionType}`;
  const thunk = getThunkHelper<T, R>({ typePrefix, withLoading });

  return dispatch(thunk({ fetchFn, fetchData }));
};

export default dispatchEntityHelper;
