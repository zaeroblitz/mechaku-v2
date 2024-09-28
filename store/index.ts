import { configureStore } from "@reduxjs/toolkit";
import { seriesApi } from "@/services/series";
import { brandsApi } from "@/services/brands";
import { gradesApi } from "@/services/grades";
import { productsApi } from "@/services/products";
import { productImagesApi } from "@/services/product-images";

export const store = configureStore({
  reducer: {
    [seriesApi.reducerPath]: seriesApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [gradesApi.reducerPath]: gradesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [productImagesApi.reducerPath]: productImagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      seriesApi.middleware,
      brandsApi.middleware,
      gradesApi.middleware,
      productsApi.middleware,
      productImagesApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
