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
import { provincesApi } from "@/services/provinces";
import { regenciesApi } from "@/services/regencies";
import { districtsApi } from "@/services/districts";
import { villagesApi } from "@/services/villages";
import { cartsApi } from "@/services/carts";
import { wishlistsApi } from "@/services/wishlists";
import { addressApi } from "@/services/address";

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
    [provincesApi.reducerPath]: provincesApi.reducer,
    [regenciesApi.reducerPath]: regenciesApi.reducer,
    [districtsApi.reducerPath]: districtsApi.reducer,
    [villagesApi.reducerPath]: villagesApi.reducer,
    [cartsApi.reducerPath]: cartsApi.reducer,
    [wishlistsApi.reducerPath]: wishlistsApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
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
      provincesApi.middleware,
      regenciesApi.middleware,
      districtsApi.middleware,
      villagesApi.middleware,
      cartsApi.middleware,
      wishlistsApi.middleware,
      addressApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
