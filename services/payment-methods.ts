import BaseResponse from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IPaymentMethod {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaymentMethodResponse extends BaseResponse {
  data: IPaymentMethod;
}

interface GetAllPaymentMethodResponse extends BaseResponse {
  data: IPaymentMethod[];
}

interface PaymentMethodParams {
  name: string;
  isActive?: boolean;
}

export const paymentMethodApi = createApi({
  reducerPath: "paymentMethodApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
  }),
  tagTypes: ["payment-methods"],
  endpoints: (builder) => ({
    createPaymentMethod: builder.mutation<
      PaymentMethodResponse,
      PaymentMethodParams
    >({
      query: (data) => ({
        url: "/payment-methods",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["payment-methods"],
    }),
    getAllPaymentMethods: builder.query<
      GetAllPaymentMethodResponse,
      { isActive?: string }
    >({
      query: (args) => {
        const { isActive } = args;
        return {
          method: "GET",
          url: "/payment-methods",
          params: { isActive },
        };
      },
      providesTags: ["payment-methods"],
    }),
    updatePaymentMethods: builder.mutation<
      PaymentMethodResponse,
      PaymentMethodParams
    >({
      query: (data) => ({
        url: "/payment-methods",
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["payment-methods"],
    }),
  }),
});

export const {
  useCreatePaymentMethodMutation,
  useGetAllPaymentMethodsQuery,
  useUpdatePaymentMethodsMutation,
} = paymentMethodApi;
