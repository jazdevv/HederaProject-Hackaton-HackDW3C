import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import factoryReducer from './slices/factorySmartContractAlice';
import { updateUser } from './slices/UserSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    factoryContractAddress: factoryReducer
  },
})

export default store;
export { updateUser };