import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IVoucher {
  id: string;
  code: string;
  description: string;
  type: string;
  value: number;
  startDate: Date;
  endDate: Date;
  usageLimit: number;
  usageCount: number;
  minPurchaseAmount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface VoucherResponse extends BaseResponse {
  data: IVoucher;
}

interface GetAllVoucherResponse extends BaseResponse {
  data: IVoucher[];
}

interface VoucherParams {
  code?: string;
  description?: string;
  type?: string;
  value?: number;
  startDate?: Date;
  endDate?: Date;
  usageLimit?: number;
  usageCount?: number;
  minPurchaseAmount?: number;
  isActive: boolean;
}

export const vouchersApi = createApi({
  reducerPath: "vouchersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
  }),
  tagTypes: ["vouchers"],
  endpoints: (builder) => ({
    createVoucher: builder.mutation<VoucherResponse, VoucherParams>({
      query: (data) => ({
        url: "/vouchers",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["vouchers"],
    }),
    getAllVouchers: builder.query<GetAllVoucherResponse, { isActive?: string }>(
      {
        query: (args) => {
          const { isActive } = args;
          return {
            method: "GET",
            url: "/vouchers",
            params: { isActive },
          };
        },
        providesTags: ["vouchers"],
      }
    ),
    getVoucherById: builder.query<VoucherResponse, string>({
      query: (id) => ({
        method: "GET",
        url: `/vouchers/${id}`,
      }),
      providesTags: ["vouchers"],
    }),
    updateVoucher: builder.mutation<VoucherResponse, VoucherParams>({
      query: (data) => ({
        url: "/vouchers",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["vouchers"],
    }),
    updateVoucherStatus: builder.mutation<
      VoucherResponse,
      { id: string; status: boolean }
    >({
      query: (data) => ({
        url: "/vouchers/update-status",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["vouchers"],
    }),
  }),
});

export const {
  useCreateVoucherMutation,
  useGetAllVouchersQuery,
  useGetVoucherByIdQuery,
  useUpdateVoucherMutation,
  useUpdateVoucherStatusMutation,
} = vouchersApi;
