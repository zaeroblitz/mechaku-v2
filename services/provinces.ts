import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IProvince {
  id: string;
  provinceId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface ProvinceResponse extends BaseResponse {
  data: IProvince;
}

interface GetAllProvinceResponse extends BaseResponse {
  data: IProvince[];
}

interface ProvinceParams {
  provinceId?: string;
}

export const provincesApi = createApi({
  reducerPath: "provincesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/region",
  }),
  tagTypes: ["provinces"],
  endpoints: (builder) => ({
    insertProvince: builder.mutation<ProvinceResponse, void>({
      query: (data) => ({
        url: "/provinces",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["provinces"],
    }),
    getAllProvinces: builder.query<GetAllProvinceResponse, void>({
      query: () => ({
        method: "GET",
        url: "/provinces",
      }),
      providesTags: ["provinces"],
    }),
    getProvinceById: builder.query<ProvinceResponse, ProvinceParams>({
      query: (data) => ({
        method: "GET",
        url: "/provinces",
        params: data,
      }),
      providesTags: ["provinces"],
    }),
  }),
});

export const {
  useInsertProvinceMutation,
  useGetAllProvincesQuery,
  useGetProvinceByIdQuery,
} = provincesApi;
