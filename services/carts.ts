import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ICartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface ICart {
  id: string;
  user_id: string;
  items: ICartItem[];
  created_at: string;
  updated_at: string;
}

interface CartResponse extends BaseResponse {
  data: ICart;
}

interface CartItemResponse extends BaseResponse {
  data: ICartItem;
}

interface GetCartParams {
  userId: string;
}

interface UpsertCartItemParams {
  cartId?: string;
  userId: string;
  productId: string;
  quantity: number;
}

interface RemoveCartITemParams {
  id: string;
}

export const cartsApi = createApi({
  reducerPath: "cartsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/shop/carts",
  }),
  tagTypes: ["carts"],
  endpoints: (builder) => ({
    getCart: builder.query<CartResponse, GetCartParams>({
      query: (data) => ({
        url: "/",
        method: "GET",
        params: data,
      }),
      providesTags: ["carts"],
    }),
    upsertCartItem: builder.mutation<CartItemResponse, UpsertCartItemParams>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["carts"],
    }),
    removeCartItem: builder.mutation<CartItemResponse, RemoveCartITemParams>({
      query: (data) => ({
        url: "/",
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["carts"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useUpsertCartItemMutation,
  useRemoveCartItemMutation,
} = cartsApi;
