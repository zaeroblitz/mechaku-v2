import { configureStore } from "@reduxjs/toolkit";
import { seriesApi } from "@/services/series";

export const store = configureStore({
  reducer: {
    [seriesApi.reducerPath]: seriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([seriesApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
