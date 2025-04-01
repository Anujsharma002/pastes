import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlice'; // ✅ Correct default import

export const store = configureStore({
  reducer: {
    pastes:pasteReducer
  },
})