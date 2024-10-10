import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IVillage {
  id: string;
  province_id: string;
  regencie_id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface VillageResponse extends BaseResponse {
  data: IVillage;
}

interface GetAllVillagesResponse extends BaseResponse {
  data: IVillage[];
}

interface VillageParams {
  districtId?: string;
  villageId?: string;
}

export const villagesApi = createApi({
  reducerPath: "villagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/region",
  }),
  tagTypes: ["villages"],
  endpoints: (builder) => ({
    insertVillage: builder.mutation<VillageResponse, void>({
      query: (data) => ({
        url: "/villages",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["villages"],
    }),
    getAllVillages: builder.query<GetAllVillagesResponse, void>({
      query: () => ({
        method: "GET",
        url: "/villages",
      }),
      providesTags: ["villages"],
    }),
    getVillageById: builder.query<VillageResponse, VillageParams>({
      query: (data) => ({
        method: "GET",
        url: "/villages",
        params: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["villages"],
    }),
  }),
});

export const {
  useInsertVillageMutation,
  useGetAllVillagesQuery,
  useGetVillageByIdQuery,
} = villagesApi;
