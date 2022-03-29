import { configureStore } from '@reduxjs/toolkit';
import templateReducer from './slices/templateSlice';
import userReducer from './slices/userSlice';

export default configureStore({
  reducer: {
    template: templateReducer,
    user: userReducer,
  }
});
