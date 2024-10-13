import { NextRequest } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";

export async function GET(req: NextRequest, params: Params) {
  try {
    const id = params.params.id;

    if (!id) {
      return Response({
        success: false,
        message: "Invalid address ID!",
        data: null,
        status: 400,
      });
    }

    const address = await prisma.userAddress.findUnique({
      where: { id },
    });

    if (!address) {
      return Response({
        success: false,
        message: "Address not found!",
        data: null,
        status: 404,
      });
    }

    return Response({
      success: true,
      message: "Successfully get user by ID!",
      data: address,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to get user by ID!",
      data: error,
      status: 500,
    });
  }
}
