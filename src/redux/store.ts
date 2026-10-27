import { configureStore } from "@reduxjs/toolkit";
import translateSlice from "./translateSlice"

export const store = configureStore({
  reducer: {
    dataTranslate: translateSlice
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>