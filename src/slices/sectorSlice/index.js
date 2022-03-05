import { createSlice } from '@reduxjs/toolkit';
import { mockSectors } from './mockSectors';
import * as selectors from './selectors';

// TO-DO: replace initial state with BE data
// Assume adding/deleting will be done in BE then entire state will be updated using updated BE

export const sectorSlice = createSlice({
  name: 'sectors',
  initialState: mockSectors,
  reducers: {
    setSectors(state, { payload }) {
      return payload;
    }
  }
});

export const sectorSelectors = {
  ...selectors,
}

export const sectorActions = {
  ...sectorSlice.actions,
}

export default sectorSlice.reducer;