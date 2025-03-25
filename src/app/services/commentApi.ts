import { TComment } from '../types'
import { api } from './api'

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<TComment, Partial<TComment>>({
      query: (body) => ({
        url: '/comments',
        method: 'POST',
        body,
      }),
    }),
    deleteComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useCreateCommentMutation, useDeleteCommentMutation } = commentApi

export const { createComment, deleteComment } = commentApi.endpoints
