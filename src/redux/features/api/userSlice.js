import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userSlice = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result = [], error, arg) => [
        "User",
        ...result.map(({ id }) => ({ type: "User", id })),
      ],
    }),
    getUserDetail: builder.query({
      query: (userId) => `/users/${userId}`,
      providesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
    addNewUser: builder.mutation({
      query: (initialUser) => ({
        url: "/users",
        method: "POST",
        body: initialUser,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const {
  useGetUsersQuery,
  useGetUserDetailQuery,
  useAddNewUserMutation,
} = userSlice;
