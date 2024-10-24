import { NextRequest } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest, params: Params) {
  try {
    const { id, password } = await req.json();

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });

    return Response({
      success: true,
      message: "Successfully update password!",
      data: updatedUser,
      status: 200,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [USER-UPDATE-PASSWORD] ~ file: route.ts:49 ~ PUT ~ error:",
      error
    );
    return Response({
      success: false,
      message: "Failed to get update password!",
      data: error,
      status: 500,
    });
  }
}
