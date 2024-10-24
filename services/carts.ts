import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "./products";

export interface ICartItem {
  id: string;
  cartId: string;
  product: IProduct;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICart {
  id: string;
  userId: string;
  items: ICartItem[];
  createdAt: string;
  updatedAt: string;
}

interface CartResponse extends BaseResponse {
  data: ICart;
}

interface CartItemResponse extends BaseResponse {
  data: ICartItem;
}

interface GetCartParams {
  userId?: string;
}

interface UpsertCartItemParams {
  cartId?: string;
  userId: string;
  productId: string;
  quantity: number;
}

interface ActionCartItemParams {
  id: string;
  action: string;
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
    actionCartItem: builder.mutation<CartItemResponse, ActionCartItemParams>({
      query: (data) => ({
        url: "/item",
        method: "PUT",
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
  useActionCartItemMutation,
  useRemoveCartItemMutation,
} = cartsApi;
