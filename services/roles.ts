import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RolesPermissionsProps {
  permissionId: string;
}

export interface IRole {
  id: string;
  name: string;
  description: string;
  rolesPermissions: RolesPermissionsProps[];
  createdAt: string;
  updatedAt: string;
}

interface RoleResponse extends BaseResponse {
  data: IRole;
}

interface GetAllRoleResponse extends BaseResponse {
  data: IRole[];
}

interface RoleParams {
  name: string;
  description: string;
}

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
  }),
  tagTypes: ["roles"],
  endpoints: (builder) => ({
    createRole: builder.mutation<RoleResponse, RoleParams>({
      query: (data) => ({
        url: "/roles",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["roles"],
    }),
    getAllRoles: builder.query<GetAllRoleResponse, void>({
      query: () => ({
        method: "GET",
        url: "/roles",
      }),
      providesTags: ["roles"],
    }),
    updateRole: builder.mutation<RoleResponse, RoleParams>({
      query: (data) => ({
        url: "/roles",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["roles"],
    }),
    deleteRole: builder.mutation<RoleResponse, { id: string }>({
      query: (data) => ({
        url: "/roles",
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["roles"],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useGetAllRolesQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;
