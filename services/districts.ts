import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IDistrict {
  id: string;
  province_id: string;
  regencie_id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface DistrictResponse extends BaseResponse {
  data: IDistrict;
}

interface GetAllDistrictsResponse extends BaseResponse {
  data: IDistrict[];
}

interface DistrictParams {
  regencyId?: string;
  districtId?: string;
}

export const districtsApi = createApi({
  reducerPath: "districtsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/region",
  }),
  tagTypes: ["districts"],
  endpoints: (builder) => ({
    insertDistrict: builder.mutation<DistrictResponse, void>({
      query: (data) => ({
        url: "/districts",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["districts"],
    }),
    getAllDistricts: builder.query<GetAllDistrictsResponse, void>({
      query: () => ({
        method: "GET",
        url: "/districts",
      }),
      providesTags: ["districts"],
    }),
    getDistrictById: builder.query<GetAllDistrictsResponse, DistrictParams>({
      query: (data) => ({
        method: "GET",
        url: "/districts",
        params: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["districts"],
    }),
  }),
});

export const {
  useInsertDistrictMutation,
  useGetAllDistrictsQuery,
  useGetDistrictByIdQuery,
} = districtsApi;
