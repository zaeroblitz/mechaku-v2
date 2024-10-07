import BaseResponse from "@/types";
import { ProductStatus } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  dimensions: string;
  weight: number;
  price: number;
  quantity: number;
  status: ProductStatus;
  seriesId: string;
  brandId: string;
  gradeId: string;
  series: {
    id: string;
    title: string;
  };
  brand: {
    id: string;
    name: string;
  };
  grade: {
    id: string;
    name: string;
  };
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
    getProducts: builder.query<GetAllProductResponse, string | undefined>({
      query: (searchParams) => ({
        method: "GET",
        url: `/products?${searchParams}`,
      }),
      providesTags: ["products"],
    }),
    getProductById: builder.query<ProductResponse, string>({
      query: (id) => ({
        method: "GET",
        url: `/products/${id}`,
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
    updateProduct: builder.mutation<ProductResponse, FormData>({
      query: (formData) => ({
        url: "/products",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),
    updateProductStatus: builder.mutation<
      ProductResponse,
      { id: string; status: string }
    >({
      query: (data) => ({
        url: "/products/update-status",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
} = productsApi;
