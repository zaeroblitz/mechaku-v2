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
        message: "Invalid user ID!",
        data: null,
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return Response({
        success: false,
        message: "User not found!",
        data: null,
        status: 404,
      });
    }

    return Response({
      success: true,
      message: "Successfully get user by ID!",
      data: user,
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
