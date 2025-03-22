import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

export type TAppStore = typeof store
export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = TAppStore['dispatch']
export type TAppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, TRootState, unknown, Action>
