import { createSlice } from '@reduxjs/toolkit';
import * as selectors from './selectors';

export const initialState = {
  employeeId: '',
  access: -1,
  name: '',
  title: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, { payload }) {
      return payload;
    },
    resetUser(state, action) {
      return initialState;
    },
  }
});

export const userSelectors = {
  ...selectors,
}

export const userActions = {
  ...userSlice.actions,
}

export default userSlice.reducer;