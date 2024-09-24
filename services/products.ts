import BaseResponse from "@/types";
import { ProductStatus } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IProductImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  dimensions: string;
  weight: number;
  price: number;
  quantity: number;
  status: ProductStatus;
  seriesId: string;
  brandId: string;
  gradeId: string;
  images: IProductImage[];
  createdAt: string;
  updatedAt: string;
}

interface ProductResponse extends BaseResponse {
  data: IProduct;
}

interface GetAllProductResponse extends BaseResponse {
  data: IProduct[];
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query<GetAllProductResponse, void>({
      query: () => ({
        method: "GET",
        url: "/products",
      }),
      providesTags: ["products"],
    }),
    createProduct: builder.mutation<ProductResponse, FormData>({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productsApi;
