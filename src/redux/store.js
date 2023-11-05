import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/api/userSlice";
import { movieSlice } from "./features/api/movieSlice";
import { reviewSlice } from "./features/api/reviewsSlice";

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [movieSlice.reducerPath]: movieSlice.reducer,
    [reviewSlice.reducerPath]: reviewSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userSlice.middleware,
      movieSlice.middleware,
      reviewSlice.middleware
    ),
});
