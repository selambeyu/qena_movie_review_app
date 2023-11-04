import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewSlice = createApi({
  reducerPath: "review",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}`,
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (movieId) => `/reviews/${movieId}`,
      providesTags: (result = [], error, arg) => [
        "Review",
        ...result.map(({ id }) => ({ type: "Review", id })),
      ],
    }),

    addReview: builder.mutation({
      query: (initialReview) => ({
        url: "/reviews",
        method: "POST",
        body: initialReview,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});
export const { useAddReviewMutation, useGetReviewsQuery } = reviewSlice;
