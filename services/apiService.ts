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
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserProfile: builder.query({
      query: (id) => `users/${id}`,
    }),
  }),
});
export const { useLoginMutation } = apiService;
export const { useGetUserProfileQuery } = apiService;