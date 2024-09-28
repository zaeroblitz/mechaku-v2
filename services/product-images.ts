import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IDeleteProductImageParams {
  id: string;
  productId: string;
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
  }),
});

export const { useDeleteProductImageMutation } = productImagesApi;
