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
        message: "Invalid product ID!",
        data: null,
        status: 400,
      });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        grade: true,
        series: true,
        images: {
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });

    if (!product) {
      return Response({
        success: false,
        message: "Product not found!",
        data: null,
        status: 404,
      });
    }

    return Response({
      success: true,
      message: "Successfully get product by ID!",
      data: product,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to get product by ID!",
      data: error,
      status: 500,
    });
  }
}
