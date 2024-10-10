import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

interface UserResponse extends BaseResponse {
  data: IUser;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/shop",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    createUser: builder.mutation<UserResponse, FormData>({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["users"],
    }),
    getUserById: builder.query<UserResponse, string | null | undefined>({
      query: (id) => ({
        method: "GET",
        url: `/user/${id}`,
      }),
      providesTags: ["users"],
    }),
    updateUser: builder.mutation<UserResponse, FormData>({
      query: (formData) => ({
        url: "/user",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["users"],
    }),
    updatePassword: builder.mutation<
      UserResponse,
      { id: string; password: string }
    >({
      query: (data) => ({
        url: "/user/update-password",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
} = usersApi;
