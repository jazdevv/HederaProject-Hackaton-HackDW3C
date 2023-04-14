import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address:"0.0.4077369"
}

export const factoryContractSlice = createSlice({
  name: 'factoryContractAddress',
  initialState,
  reducers: {

  },
})


export default factoryContractSlice.reducer