import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/UserSlice'
import { updateUser } from './slices/UserSlice';

export const store = configureStore({
  reducer: {
    user: userReducer
  },
})

export default store;
export { updateUser };