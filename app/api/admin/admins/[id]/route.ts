import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import bcrypt from "bcrypt";

export async function GET(req: NextRequest, params: Params) {
  try {
    const id = params.params.id;

    if (!id) {
      return Response({
        success: false,
        message: "Invalid admin ID!",
        data: null,
        status: 400,
      });
    }

    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      return Response({
        success: false,
        message: "Admin not found!",
        data: null,
        status: 404,
      });
    }

    return Response({
      success: true,
      message: "Successfully get admin by ID!",
      data: admin,
      status: 200,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [Get Admin by ID] ~ file: route.ts:40 ~ GET ~ error:",
      error
    );
    return Response({
      success: false,
      message: "Failed to get admin by ID!",
      data: error,
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, params: Params) {
  try {
    const id = params.params.id;
    const { username, email, password } = await req.json();

    if (!id) {
      return Response({
        success: false,
        message: "Invalid admin ID!",
        data: null,
        status: 400,
      });
    }

    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      return Response({
        success: false,
        message: "Admin not found!",
        data: null,
        status: 404,
      });
    }

    let data;
    if (password) {
      data = {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      };
    } else {
      data = {
        username,
        email,
      };
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data,
    });

    return Response({
      success: true,
      message: "Successfully updated admin data!",
      data: updatedAdmin,
      status: 200,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [Update Admin] ~ file: route.ts:102 ~ PUT ~ error:",
      error
    );
    return Response({
      success: false,
      message: "An error occurred while updating admin data!",
      data: null,
      status: 500,
    });
  }
}
