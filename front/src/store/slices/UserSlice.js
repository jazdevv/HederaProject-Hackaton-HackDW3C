import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    topic:"",
    pairingString:"",
    pairedAccounts:[]
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state,action) => {

      if(action.payload.pairedAccounts){
        state.pairedAccounts = action.payload.pairedAccounts;
      }
      if(action.payload.topic){
        state.topic = action.payload.topic;
        state.pairingString = action.payload.pairingString;
      }
      
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions

export default userSlice.reducer