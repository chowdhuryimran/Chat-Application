import { createSlice } from '@reduxjs/toolkit'

export const activeSlice = createSlice({
    name: 'active',
    initialState:{
        activeInfo: localStorage.getItem('activeFriend')? JSON.parse(localStorage.getItem('activeFriend')):null
    },
    reducers: {
       activeChat : (state, action) =>{
                state.activeInfo = action.payload
        },
    }

    
})
export const {activeChat} = activeSlice.actions
export default activeSlice.reducer