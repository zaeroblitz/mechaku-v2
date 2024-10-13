import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IRegency {
  id: string;
  provinceId: string;
  regencieId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface RegencyResponse extends BaseResponse {
  data: IRegency;
}

interface GetAllRegenciesResponse extends BaseResponse {
  data: IRegency[];
}

interface RegencyParams {
  provinceId?: string;
  regencyId?: string;
}

export const regenciesApi = createApi({
  reducerPath: "regenciesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/region",
  }),
  tagTypes: ["regencies"],
  endpoints: (builder) => ({
    insertRegency: builder.mutation<RegencyResponse, void>({
      query: (data) => ({
        url: "/regencies",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["regencies"],
    }),
    getAllRegencies: builder.query<GetAllRegenciesResponse, void>({
      query: () => ({
        method: "GET",
        url: "/regencies",
      }),
      providesTags: ["regencies"],
    }),
    getRegencyById: builder.query<GetAllRegenciesResponse, RegencyParams>({
      query: (data) => ({
        method: "GET",
        url: "/regencies",
        params: data,
      }),
      providesTags: ["regencies"],
    }),
  }),
});

export const {
  useInsertRegencyMutation,
  useGetAllRegenciesQuery,
  useGetRegencyByIdQuery,
} = regenciesApi;
