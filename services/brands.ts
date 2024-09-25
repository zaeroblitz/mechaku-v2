import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IBrand {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BrandResponse extends BaseResponse {
  data: IBrand;
}

interface GetAllBrandResponse extends BaseResponse {
  data: IBrand[];
}

interface BrandParams {
  name: string;
  isActive?: boolean;
}

export const brandsApi = createApi({
  reducerPath: "brandsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
  }),
  tagTypes: ["brands"],
  endpoints: (builder) => ({
    createBrand: builder.mutation<BrandResponse, BrandParams>({
      query: (data) => ({
        url: "/brands",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["brands"],
    }),
    getAllBrands: builder.query<GetAllBrandResponse, { isActive?: string }>({
      query: (args) => {
        const { isActive } = args;
        return {
          method: "GET",
          url: "/brands",
          params: { isActive },
        };
      },
      providesTags: ["brands"],
    }),
    updateBrand: builder.mutation<BrandResponse, BrandParams>({
      query: (data) => ({
        url: "/brands",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["brands"],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllBrandsQuery,
  useUpdateBrandMutation,
} = brandsApi;
