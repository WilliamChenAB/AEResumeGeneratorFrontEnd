import { createSlice } from '@reduxjs/toolkit';
import * as selectors from './selectors';

// state will take form on 'sectors' from mockResume

export const initialState = {
  projectName: '',
  updateDate: '-',
  status: 'Requested',
  action: 'Submit',
  sectors: {
    justification: {},
    education: {
      years: '',
      sections: {},
    },
    summary: {},
    experience: {},
  },
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResume(state, action) {
      return action.payload;
    },
    updateSelectedSection(state, action) {
      return {
        ...state,
        sectors: {
          ...state.sectors,
          [action.payload.sector] : action.payload.sections
        }
      }
    },
    addSelectedEducation(state, action) {
      state.sectors.education.sections = [...state.sectors.education.sections, action.payload];
    },
    removeSelectedSection(state, action) {
      const updatedSector = Object.assign({}, state);
      delete updatedSector[action.payload.sector][action.payload.sid];
      state[action.payload.sector] = updatedSector;
    },
  }
});

export const resumeSelectors = {
  ...selectors,
}

export const resumeActions = {
  ...resumeSlice.actions,
}

export default resumeSlice.reducer;