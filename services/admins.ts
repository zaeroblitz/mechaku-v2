import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RoleProps {
  name: string;
}

export interface IAdmin {
  id: string;
  username: string;
  email: string;
  roleId: string;
  role: RoleProps;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminResponse extends BaseResponse {
  data: IAdmin;
}

interface GetAllAdminResponse extends BaseResponse {
  data: IAdmin[];
}

interface AdminParams {
  username: string;
  email: string;
  roleId: string;
  password: string;
  isActive?: boolean;
}

export const adminsApi = createApi({
  reducerPath: "adminsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
  }),
  tagTypes: ["admins"],
  endpoints: (builder) => ({
    createAdmin: builder.mutation<AdminResponse, AdminParams>({
      query: (data) => ({
        url: "/admins",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["admins"],
    }),
    getAllAdmins: builder.query<GetAllAdminResponse, void>({
      query: () => ({
        method: "GET",
        url: "/admins",
      }),
      providesTags: ["admins"],
    }),
    updateAdmin: builder.mutation<AdminResponse, AdminParams>({
      query: (data) => ({
        url: "/admins",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["admins"],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useUpdateAdminMutation,
} = adminsApi;
