import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { id, productId } = await req.json();

    // Check for valid product ID
    if (!id || !productId) {
      return Response({
        success: false,
        message: "Invalid image or product ID!",
        data: null,
        status: 400,
      });
    }

    // Find existing product
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
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
        message: "Product not exists!",
        data: null,
        status: 404,
      });
    }

    // Find existing product image
    const productImage = await prisma.productImage.findUnique({
      where: { id },
    });

    if (!productImage) {
      return Response({
        success: false,
        message: "Product image not exists!",
        data: null,
        status: 404,
      });
    }

    // Delete product image
    await prisma.productImage.delete({
      where: { id },
    });

    // Update displayOrder for remaining product images
    const remainingImages = product.images.filter((image) => image.id !== id);
    for (let i = 0; i < remainingImages.length; i++) {
      await prisma.productImage.update({
        where: { id: remainingImages[i].id },
        data: { displayOrder: i + 1, isPrimary: i === 0 },
      });
    }

    return Response({
      success: true,
      message: "Successfully delete selected product image!",
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to delete selected product image!",
      data: error,
      status: 500,
    });
  }
}
