import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice';
import sectorReducer from './slices/sectorSlice';
import templateReducer from './slices/templateSlice';
import userReducer from './slices/userSlice';

export default configureStore({
  reducer: {
    resume: resumeReducer,
    sector: sectorReducer,
    template: templateReducer,
    user: userReducer,
  }
});
