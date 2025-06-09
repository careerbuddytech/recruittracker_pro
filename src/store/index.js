import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './slices/currencySlice';
import transactionReducer from './slices/transactionSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    transactions: transactionReducer,
    user: userReducer,
  },
});