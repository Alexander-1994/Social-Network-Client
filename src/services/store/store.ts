import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { api } from '../api'

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type TAppStore = typeof store
export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = TAppStore['dispatch']
export type TAppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, TRootState, unknown, Action>
