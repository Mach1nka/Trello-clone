import getSliceHelper from '../../../utils/slice-helper';
import { authSliceSetup } from '../reducers/auth';

const authSlice = getSliceHelper(authSliceSetup);

export const { cleaning } = authSlice.actions;
export default authSlice.reducer;
