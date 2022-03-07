import { createSlice } from '@reduxjs/toolkit';
import * as selectors from './selectors';

// state will take form on 'sectors' from mockResume

// export const sampleInitialState = {
//   justification: {},
//   education: {
//     years: '',
//     sections: {},
//   },
//   summary: {},
//   experience: {},
// };

export const resumeSlice = createSlice({
  name: 'resume',
  initialState: {},
  reducers: {
    setResume(state, action) {
      return action.payload
    },
    addSelectedSection(state, action) {
      state[action.payload.sector] = [...state[action.payload.sector], action.payload.selectedSection];
    },
    removeSelectedSection(state, action) {
      const updatedSector = Object.assign({}, state);
      delete updatedSector[action.payload.sector][action.payload.sid];
      state[action.payload.sector] = updatedSector;
    },
  }
});

export const sectorSelectors = {
  ...selectors,
}

export const sectorActions = {
  ...resumeSlice.actions,
}

export default resumeSlice.reducer;