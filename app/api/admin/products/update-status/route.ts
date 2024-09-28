import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const payload = await req.json();
    const id = payload.id;
    const status = payload.status;

    // Check for valid product ID
    if (!id) {
      return Response({
        success: false,
        message: "Invalid product ID!",
        data: null,
        status: 400,
      });
    }

    // Find existing product
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return Response({
        success: false,
        message: "Product not found!",
        data: null,
        status: 404,
      });
    }

    // Update the product in the database
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        status,
      },
    });

    return Response({
      success: true,
      message: "Successfully updated product status!",
      data: updatedProduct,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated product status!",
      data: error,
      status: 500,
    });
  }
}
