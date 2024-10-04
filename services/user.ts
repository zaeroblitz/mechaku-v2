import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
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
  }),
});

export const { useCreateUserMutation } = usersApi;
