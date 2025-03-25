import { TUser } from '../types'
import { api } from './api'

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<
      { email: string; password: string; name: string },
      { email: string; password: string; name: string }
    >({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
    current: builder.query<TUser, void>({
      query: () => ({
        url: '/current',
        method: 'GET',
      }),
    }),
    getUser: builder.query<TUser, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    updateUser: builder.mutation<TUser, { userData: FormData; id: string }>({
      query: ({ id, userData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
} = userApi

export const { login, register, current, getUser, updateUser } = userApi.endpoints
