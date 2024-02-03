import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import activeSlice from './slices/activeSlice'

export const store = configureStore({
  reducer: {
    userLoginInfo: userSlice,
    activeChatSlice: activeSlice
  },
})

