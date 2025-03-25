import { TLike } from '../types'
import { api } from './api'

export const likeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<TLike, { postId: string }>({
      query: (body) => ({
        url: '/likes',
        method: 'POST',
        body,
      }),
    }),
    unlikePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `likes/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useLikePostMutation, useUnlikePostMutation } = likeApi

export const { likePost, unlikePost } = likeApi.endpoints
