import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import factoryReducer from './slices/factorySmartContractSlice';
import contractsMainPage from './slices/contractsMainPage';
import { update } from './slices/contractsMainPage';
import { updateUser } from './slices/UserSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    factoryContractAddress: factoryReducer,
    mainpageContracts: contractsMainPage
  },
})

export default store;
export { updateUser,update };