import { createAsyncThunk } from '@reduxjs/toolkit';

import { BaseResponse, ErrorInfo, HttpErrorCodes, HttpStatus } from '../service/httpService/types';
import { AlertStatusData } from '../service/resources/models/maintain.model';
import { cleaning } from '../store/slices/auth';
import { addAlert, setLoading } from '../store/slices/maintain';

interface ThunkHelperProps {
  typePrefix: string;
  withLoading: boolean;
}

interface CreateAsyncThunkProps<T, R> {
  fetchFn: (args: T) => Promise<BaseResponse<R>>;
  fetchData: T;
}

const getThunkHelper = <T, R>({ typePrefix, withLoading }: ThunkHelperProps) =>
  createAsyncThunk<R, CreateAsyncThunkProps<T, R>>(
    typePrefix,
    async ({ fetchFn, fetchData }, { dispatch }) => {
      try {
        if (withLoading) dispatch(setLoading(true));

        const { data } = await fetchFn(fetchData);
        return data;
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
