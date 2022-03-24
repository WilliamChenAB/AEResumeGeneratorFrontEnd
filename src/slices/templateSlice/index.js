import { createSlice } from '@reduxjs/toolkit';
import * as selectors from './selectors';

// TO-DO: replace initial state with BE data
// Assume adding/deleting will be done in BE then entire state will be updated using updated BE

export const templateSlice = createSlice({
  name: 'templateSectors',
  initialState: [],
  reducers: {
    setTemplateSectors(state, action) {
      return action.payload;
    },
    addTemplateSector(state, action) {
      return [...state, action.payload];
    },
    removeTemplateSector(state, action) {
      return [...state.filter(type => type !== action.payload)]
    },
  }
});

export const templateSelectors = {
  ...selectors,
}

export const templateActions = {
  ...templateSlice.actions,
}

export default templateSlice.reducer;