import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Series {
  id: string;
  title: string;
  description: string;
  author: string | null;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const seriesApi = createApi({
  reducerPath: "seriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
  }),
  tagTypes: ["series"],
  endpoints: (builder) => ({
    createSeries: builder.mutation<Series, FormData>({
      query: (formData) => ({
        url: "/seriess",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useCreateSeriesMutation } = seriesApi;
