import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProductImage } from "./products";

interface IDeleteProductImageParams {
  id: string;
  productId: string;
}

interface IUpdateProductImageOrderParams {
  images: IProductImage[];
}

export const productImagesApi = createApi({
  reducerPath: "productImagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    deleteProductImage: builder.mutation<
      BaseResponse,
      IDeleteProductImageParams
    >({
      query: (data) => ({
        url: "/product-images",
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["products"],
    }),
    updateProductImageOrder: builder.mutation<
      BaseResponse,
      IUpdateProductImageOrderParams
    >({
      query: (data) => ({
        url: "/product-images",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useDeleteProductImageMutation,
  useUpdateProductImageOrderMutation,
} = productImagesApi;
