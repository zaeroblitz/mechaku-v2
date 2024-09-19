import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IGrade {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GradeResponse extends BaseResponse {
  data: IGrade;
}

interface GetAllGradeResponse extends BaseResponse {
  data: IGrade[];
}

interface GradeParams {
  name: string;
  isActive?: boolean;
}

export const gradesApi = createApi({
  reducerPath: "gradesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
  }),
  tagTypes: ["grades"],
  endpoints: (builder) => ({
    createGrade: builder.mutation<GradeResponse, GradeParams>({
      query: (data) => ({
        url: "/grades",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["grades"],
    }),
    getAllGrades: builder.query<GetAllGradeResponse, void>({
      query: () => ({
        method: "GET",
        url: "/grades",
      }),
      providesTags: ["grades"],
    }),
    updateGrade: builder.mutation<GradeResponse, GradeParams>({
      query: (data) => ({
        url: "/grades",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["grades"],
    }),
  }),
});

export const {
  useCreateGradeMutation,
  useGetAllGradesQuery,
  useUpdateGradeMutation,
} = gradesApi;
