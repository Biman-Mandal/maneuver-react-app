import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = `${ process.env.REACT_APP_NODE_APP_BASE_URL}/api`;
console.log(BASE_URL, "test 001222222")
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, // Adjust the base URL
    prepareHeaders: (headers) => {
      // Automatically add the token from localStorage to every API request
      const token = localStorage.getItem('x-access-token');
      if (token) {
        headers.set('x-access-token', token); // Attach token in the header for each request
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        url: 'auth/login',
        method: 'POST',
        body: user,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    // Other endpoints here (e.g., register, password reset, etc.)
  }),
});

export const { useLoginUserMutation } = userAuthApi;
