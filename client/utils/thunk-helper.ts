import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  BaseResponse,
  ErrorInfo,
  HttpErrorCodes,
  HttpStatus
} from '../src/service/httpService/types';
import { AlertStatusData } from '../src/service/resources/models/maintain.model';
import { cleaning } from '../src/store/slices/auth';
import { addAlert, setLoading } from '../src/store/slices/maintain';

interface ThunkHelperProps {
  typePrefix: string;
}

interface CreateAsyncThunkProps<T, R> {
  fetchFn: (args: T) => Promise<BaseResponse<R>>;
  fetchData: T;
}

const getThunkHelper = <T, R>({ typePrefix }: ThunkHelperProps) =>
  createAsyncThunk<R, CreateAsyncThunkProps<T, R>>(
    typePrefix,
    async ({ fetchFn, fetchData }, { dispatch }) => {
      try {
        dispatch(setLoading(true));

        const response = await fetchFn(fetchData);
        return response.data;
      } catch (e) {
        const error = e as ErrorInfo;

        if (error.statusCode === HttpStatus.InvalidCredentials) {
          dispatch(cleaning());
        }

        if (HttpErrorCodes.includes(error.statusCode)) {
          dispatch(addAlert({ status: AlertStatusData.Error, message: error.message }));
        }

        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    }
  );

export default getThunkHelper;
