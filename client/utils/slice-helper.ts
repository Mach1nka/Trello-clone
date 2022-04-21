import { createSlice } from '@reduxjs/toolkit';
import { SliceHelperProps } from '../src/service/resources/models/common.model';

const getSliceHelper = <T>({
  name,
  initialState,
  extraReducers
}: Omit<SliceHelperProps<T>, 'reducers'>) =>
  createSlice({
    name,
    initialState,
    reducers: {
      cleaning: () => initialState
    },
    extraReducers
  });

export default getSliceHelper;
