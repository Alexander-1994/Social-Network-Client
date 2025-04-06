import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

import { api } from '../api'
import { listenerMiddleware } from '../middleware'
import user from './userSlice'

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer, user },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware),
})

export type TAppStore = typeof store
export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = TAppStore['dispatch']
export type TAppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, TRootState, unknown, Action>
