import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ISeries {
  id: string;
  title: string;
  description: string;
  author: string | null;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SeriesResponse extends BaseResponse {
  data: ISeries;
}

interface GetAllSeriesResponse extends BaseResponse {
  data: ISeries[];
}

export const seriesApi = createApi({
  reducerPath: "seriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
  }),
  tagTypes: ["series"],
  endpoints: (builder) => ({
    createSeries: builder.mutation<SeriesResponse, FormData>({
      query: (formData) => ({
        url: "/series",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["series"],
    }),
    getAllSeries: builder.query<GetAllSeriesResponse, void>({
      query: () => ({
        method: "GET",
        url: "/series",
      }),
      providesTags: ["series"],
    }),
    getSeriesById: builder.query<SeriesResponse, string>({
      query: (id) => ({
        method: "GET",
        url: `/series/${id}`,
      }),
      providesTags: ["series"],
    }),
    updateSeries: builder.mutation<SeriesResponse, FormData>({
      query: (formData) => ({
        url: "/series",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["series"],
    }),
  }),
});

export const {
  useCreateSeriesMutation,
  useGetAllSeriesQuery,
  useGetSeriesByIdQuery,
  useUpdateSeriesMutation,
} = seriesApi;
