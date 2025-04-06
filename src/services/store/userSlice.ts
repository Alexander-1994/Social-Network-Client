import { createSlice } from '@reduxjs/toolkit'
import { castDraft } from 'immer'

import type { TUser } from '../../common/types'

import { userApi } from '../api'

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
        state.current = castDraft(action.payload)
      })
      .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action) => {
        state.user = castDraft(action.payload)
      })
  },
})

export const { logout, resetUser } = slice.actions
export default slice.reducer
