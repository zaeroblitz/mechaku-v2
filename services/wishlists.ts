import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IWishlist {
  id: string;
  user_id: string;
  productId: string;
  created_at: string;
  updated_at: string;
}

interface WishlistResponse extends BaseResponse {
  data: IWishlist;
}

interface UserWishlistsResponse extends BaseResponse {
  data: IWishlist[];
}

interface GetWihslistParams {
  userId: string;
}

interface CreateWishlistParams {
  userId: string;
  productId: string;
}

interface RemoveWishlistParams {
  id: string;
}

export const wishlistsApi = createApi({
  reducerPath: "wishlistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/shop/wishlists",
  }),
  tagTypes: ["wishlists"],
  endpoints: (builder) => ({
    getAllWishlists: builder.query<UserWishlistsResponse, GetWihslistParams>({
      query: (data) => ({
        url: "/",
        method: "GET",
        params: data,
      }),
      providesTags: ["wishlists"],
    }),
    createWishlist: builder.mutation<WishlistResponse, CreateWishlistParams>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["wishlists"],
    }),
    removeWishlist: builder.mutation<WishlistResponse, RemoveWishlistParams>({
      query: (data) => ({
        url: "/",
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["wishlists"],
    }),
  }),
});

export const {
  useGetAllWishlistsQuery,
  useCreateWishlistMutation,
  useRemoveWishlistMutation,
} = wishlistsApi;
