import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

import { SliceName } from '../../service/resources/models/common.model';
import { MaintainState, Alert } from '../../service/resources/models/maintain.model';

const initialState: MaintainState = {
  loading: false,
  alerts: []
};

const maintainSlice = createSlice({
  name: SliceName.Maintain,
  initialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
    addAlert: {
      reducer: (state, { payload }: PayloadAction<Alert>) => {
        state.alerts.push(payload);
      },
      prepare: (alert: Omit<Alert, 'id'>) => {
        const id = nanoid();
        return { payload: { id, ...alert } };
      }
    },
    deleteAlert(state, { payload: alertId }: PayloadAction<string>) {
      state.alerts = state.alerts.filter((el) => el.id !== alertId);
    }
  }
});

export const { addAlert, deleteAlert, setLoading } = maintainSlice.actions;
export default maintainSlice.reducer;
