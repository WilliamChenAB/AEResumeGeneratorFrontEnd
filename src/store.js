import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice';
import sectorReducer from './slices/sectorSlice';


export default configureStore({
  reducer: {
    resume: resumeReducer,
    sector: sectorReducer,

  }
});