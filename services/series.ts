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
    getAllSeries: builder.query<GetAllSeriesResponse, { isActive?: string }>({
      query: (args) => {
        const { isActive } = args;
        return {
          method: "GET",
          url: "/series",
          params: { isActive },
        };
      },
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
        method: "PUT",
        url: "/series",
        body: formData,
      }),
      invalidatesTags: ["series"],
    }),
    updateSeriesStatus: builder.mutation<
      SeriesResponse,
      { id: string; isActive: boolean }
    >({
      query: (data) => ({
        method: "PUT",
        url: `/series/update-status/${data.id}`,
        body: data,
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
  useUpdateSeriesStatusMutation,
} = seriesApi;
