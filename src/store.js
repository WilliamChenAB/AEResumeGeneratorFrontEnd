import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

export default configureStore({
  reducer: {
    // counter IS A SAMPLE/PLACEHOLDER REDUCER
    // REMOVE ONCE WE HAVE ACTUAL REDUCERS
    counter: counterReducer
  }
});