import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  uid: '',
  rid: '',
  sectors: {
    justification: {},
    education: {
      years: '',
    },
    summary: {},
    experience: {},
  }
}

// TO-DO: replace initial state with BE data

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    selectSection: {
      reducer(state, action) {
        state.sectors[action.payload.sector] = [...state.sectors[action.payload.sector], action.payload.body];
      }
    },
    deselectSection: {
      reducer(state, action) {
        delete state.sectors[action.payload.sector][action.payload.sid]
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = resumeSlice.actions;

export default resumeSlice.reducer;