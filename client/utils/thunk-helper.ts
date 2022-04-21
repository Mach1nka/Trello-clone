import { createAsyncThunk } from '@reduxjs/toolkit';

import { HttpErrorCodes, HttpStatus } from '../src/service/httpService/types';
import { AlertStatusData } from '../src/service/resources/models/maintain.model';
import { logout } from '../src/store/slices/auth';
import { addAlert, setLoading } from '../src/store/slices/maintain';

interface ThunkHelperProps {
  type: string;
}

export type CreateAsyncThunkProps = {
  fetchFn: (args: Record<string, any>) => any;
  data?: any;
};

const getThunkHelper = ({ type }: ThunkHelperProps) =>
  createAsyncThunk<any, CreateAsyncThunkProps>(type, async (fetchProps, thunkApi) => {
    const { fetchFn, data } = fetchProps;
    const { dispatch } = thunkApi;
    dispatch(setLoading(true));

    // TODO: must be BaseResponse<any> | ErrorInfo
    const response: any = await fetchFn(data);

    console.log(response);

    if (response.statusCode === HttpStatus.InvalidCredentials) {
      dispatch(logout());
    }

    if (HttpErrorCodes.includes(response.statusCode)) {
      dispatch(addAlert({ status: AlertStatusData.Error, message: response.message }));
    }

    dispatch(setLoading(false));
    return response;
  });

export default getThunkHelper;
