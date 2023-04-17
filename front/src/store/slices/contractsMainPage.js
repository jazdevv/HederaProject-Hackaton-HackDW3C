import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mainPageContracts:[]
}

export const ContractsMainPageSlice = createSlice({
  name: 'mainpageContracts',
  initialState,
  reducers: {
    update: (state,action) => {
      console.log(action.payload)
      state.mainPageContracts = [...action.payload];
      
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { update } = ContractsMainPageSlice.actions

export default ContractsMainPageSlice.reducer