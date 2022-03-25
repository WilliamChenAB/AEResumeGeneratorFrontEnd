import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice';
import sectorReducer from './slices/sectorSlice';
import employeeReducer from './slices/currentEmployeeSlice';


export default configureStore({
  reducer: {
    resume: resumeReducer,
    sector: sectorReducer,
    employee: employeeReducer,
  }
});