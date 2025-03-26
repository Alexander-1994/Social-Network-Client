import { TPost } from '../../common/types'
import { api } from './api'

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<TPost, { content: string }>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
    }),
    getAllPosts: builder.query<TPost[], void>({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
    }),
    getPost: builder.query<TPost, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useGetPostQuery,
  useLazyGetPostQuery,
  useDeletePostMutation,
} = postApi

export const { createPost, getAllPosts, getPost, deletePost } = postApi.endpoints
