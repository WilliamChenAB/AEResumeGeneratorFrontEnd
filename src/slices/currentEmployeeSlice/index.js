import { createSlice } from '@reduxjs/toolkit';
import * as selectors from './selectors';

// state will take form on 'sectors' from mockResume

export const initialState = {
  eid: '',
  access: 0,
  employeeName: '',
  title: '',
  email: '',
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployee(state, { payload }) {
      return payload;
    },
  }
});

export const employeeSelectors = {
  ...selectors,
}

export const employeeActions = {
  ...employeeSlice.actions,
}

export default employeeSlice.reducer;