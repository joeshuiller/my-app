import { createApi } from '@reduxjs/toolkit/query/react';
import { apiClient } from "./apiClients";

const axiosBaseQuery = () => async ({ url, method, data, params }: any) => {
  try {
    const result = await apiClient({ url, method, data, params });
    return { data: result.data };
  } catch (axiosError: any) {
    return { error: { status: axiosError.response?.status, data: axiosError.response?.data } };
  }
};

export const apiService = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'users/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserProfile: builder.query({
      query: (id) => `users/${id}`,
    }),
    getTaskUsers: builder.mutation({
      query: (credentials) => ({
        url: 'task/listTaskUsers',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerTaskUsers: builder.mutation({
      query: (credentials) => ({
        url: 'task/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});
export const { 
  useLoginMutation, 
  useGetUserProfileQuery,
  useRegisterMutation,
  useGetTaskUsersMutation,
  useRegisterTaskUsersMutation
} = apiService;