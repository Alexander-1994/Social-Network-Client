import { createSlice } from '@reduxjs/toolkit'
import { castDraft } from 'immer'

import type { TUser } from '../../common/types'

import { userApi } from '../api'
import type { TRootState } from './store'

type TUserState = {
  user: TUser | null
  isAuthenticated: boolean
  users: TUser[] | null
  current: TUser | null
  token?: string
}

const initialState: TUserState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.isAuthenticated = true
        state.current = castDraft(action.payload)
      })
      .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action) => {
        state.user = castDraft(action.payload)
      })
  },
})

export const {
  reducer: userReducer,
  actions: { logout, resetUser },
} = slice

export const isAuthenticatedSelector = (state: TRootState) => state.user.isAuthenticated
export const currentSelector = (state: TRootState) => state.user.current
export const usersSelector = (state: TRootState) => state.user.users
export const userSelector = (state: TRootState) => state.user.user
