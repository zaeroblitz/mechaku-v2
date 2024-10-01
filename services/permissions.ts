import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IPermission {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface PermissionResponse extends BaseResponse {
  data: IPermission;
}

interface GetAllPermissionResponse extends BaseResponse {
  data: IPermission[];
}

interface PermissionParams {
  name: string;
  description: string;
}

export const permissionsApi = createApi({
  reducerPath: "permissionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
  }),
  tagTypes: ["permissions"],
  endpoints: (builder) => ({
    createPermission: builder.mutation<PermissionResponse, PermissionParams>({
      query: (data) => ({
        url: "/permissions",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["permissions"],
    }),
    getAllPermissions: builder.query<GetAllPermissionResponse, void>({
      query: () => ({
        method: "GET",
        url: "/permissions",
      }),
      providesTags: ["permissions"],
    }),
    updatePermission: builder.mutation<PermissionResponse, PermissionParams>({
      query: (data) => ({
        url: "/permissions",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["permissions"],
    }),
    deletePermission: builder.mutation<PermissionResponse, { id: string }>({
      query: (data) => ({
        url: "/permissions",
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["permissions"],
    }),
  }),
});

export const {
  useCreatePermissionMutation,
  useGetAllPermissionsQuery,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = permissionsApi;
