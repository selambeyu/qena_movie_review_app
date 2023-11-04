import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const boundary = "--------------------------123456789012345678901234";

export const movieSlice = createApi({
  reducerPath: "movie",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}`,
  }),
  tagTypes: ["Movie"],
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (page, rowsPerPage = 5) =>
        `/movies?page=${page}&perPage=${rowsPerPage}`,
      transformResponse: (response) => response,
      providesTags: ["Movie"],
    }),
    getMovie: builder.query({
      query: (movieId) => `/movies/${movieId}`,
      providesTags: (result, error, arg) => [{ type: "Movie", id: arg }],
    }),
    addMovie: builder.mutation({
      query: (initialMovie) => ({
        url: "/movies",
        method: "POST",
        body: initialMovie,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
        },
      }),
      invalidatesTags: ["Movie"],
    }),
  }),
});

export const { useAddMovieMutation, useGetMovieQuery, useGetMoviesQuery } =
  movieSlice;
