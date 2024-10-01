import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: NextRequest, params: Params) {
  try {
    const id = params.params.id;

    if (!id) {
      return Response({
        success: false,
        message: "Invalid voucher ID!",
        data: null,
        status: 400,
      });
    }

    const voucher = await prisma.voucher.findUnique({
      where: { id },
    });

    if (!voucher) {
      return Response({
        success: false,
        message: "Voucher not found!",
        data: null,
        status: 404,
      });
    }

    return Response({
      success: true,
      message: "Successfully get voucher by ID!",
      data: voucher,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to get voucher by ID!",
      data: error,
      status: 500,
    });
  }
}
