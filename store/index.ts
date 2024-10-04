import { configureStore } from "@reduxjs/toolkit";
import { seriesApi } from "@/services/series";
import { brandsApi } from "@/services/brands";
import { gradesApi } from "@/services/grades";
import { productsApi } from "@/services/products";
import { productImagesApi } from "@/services/product-images";
import { vouchersApi } from "@/services/vouchers";
import { paymentMethodApi } from "@/services/payment-methods";
import { rolesApi } from "@/services/roles";
import { permissionsApi } from "@/services/permissions";
import { adminsApi } from "@/services/admins";
import { usersApi } from "@/services/user";

export const store = configureStore({
  reducer: {
    [seriesApi.reducerPath]: seriesApi.reducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [gradesApi.reducerPath]: gradesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [productImagesApi.reducerPath]: productImagesApi.reducer,
    [vouchersApi.reducerPath]: vouchersApi.reducer,
    [paymentMethodApi.reducerPath]: paymentMethodApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [permissionsApi.reducerPath]: permissionsApi.reducer,
    [adminsApi.reducerPath]: adminsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      seriesApi.middleware,
      brandsApi.middleware,
      gradesApi.middleware,
      productsApi.middleware,
      productImagesApi.middleware,
      vouchersApi.middleware,
      paymentMethodApi.middleware,
      rolesApi.middleware,
      permissionsApi.middleware,
      adminsApi.middleware,
      usersApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
