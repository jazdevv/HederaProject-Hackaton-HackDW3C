import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address:"0.0.4077369"
}

export const factoryContractSlice = createSlice({
  name: 'factoryContractAddress',
  initialState,
  reducers: {
    updateState: (state,action) => {
      state.address = action.payload
    },
  },
})


export default factoryContractSlice.reducer