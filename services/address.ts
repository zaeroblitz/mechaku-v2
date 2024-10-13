import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProvince } from "./provinces";
import { IRegency } from "./regencies";
import { IDistrict } from "./districts";
import { IVillage } from "./villages";

export interface IAddress {
  id: string;
  user_id: string;
  label: string;
  address: string;
  provinceId: string;
  province: IProvince;
  regencyId: string;
  regency: IRegency;
  districtId: string;
  district: IDistrict;
  villageId: string;
  village: IVillage;
  zipCode: string;
  phone_number?: string;
  created_at: string;
  updated_at: string;
}

interface AddressResponse extends BaseResponse {
  data: IAddress;
}

interface UserAddresssResponse extends BaseResponse {
  data: IAddress[];
}

interface GetAddressParams {
  userId?: string;
}

interface CreateAddressParams {
  userId: string;
  label: string;
  address: string;
  provinceId: string;
  regencyId: string;
  districtId: string;
  villageId: string;
  zipCode: string;
  phoneNumber?: string;
}

interface UpdateAddressParams {
  id: string;
  label: string;
  address: string;
  provinceId: string;
  regencyId: string;
  districtId: string;
  villageId: string;
  zipCode: string;
  phoneNumber?: string;
}

interface RemoveAddressParams {
  id: string;
}

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/shop/user/address",
  }),
  tagTypes: ["address"],
  endpoints: (builder) => ({
    getAllAddresss: builder.query<UserAddresssResponse, GetAddressParams>({
      query: (data) => ({
        url: "/",
        method: "GET",
        params: data,
      }),
      providesTags: ["address"],
    }),
    getAddressById: builder.query<AddressResponse, string>({
      query: (id) => ({
        method: "GET",
        url: `/${id}`,
      }),
      providesTags: ["address"],
    }),
    createAddress: builder.mutation<AddressResponse, CreateAddressParams>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["address"],
    }),
    updateAddress: builder.mutation<AddressResponse, UpdateAddressParams>({
      query: (data) => ({
        url: "/",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["address"],
    }),
    removeAddress: builder.mutation<AddressResponse, RemoveAddressParams>({
      query: (data) => ({
        url: "/",
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["address"],
    }),
  }),
});

export const {
  useGetAllAddresssQuery,
  useGetAddressByIdQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useRemoveAddressMutation,
} = addressApi;
