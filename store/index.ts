import { configureStore } from "@reduxjs/toolkit";
import { seriesApi } from "@/services/series";
import { brandsApi } from "@/services/brands";

export const store = configureStore({
  reducer: {
    [seriesApi.reducerPath]: seriesApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([seriesApi.middleware, brandsApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
