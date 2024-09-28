import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";
import { IProductImage } from "@/services/products";

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

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const payload = await req.json();
    const images: IProductImage[] = payload.images;

    if (images.length === 0) {
      return Response({
        success: false,
        message: "No images provided!",
        data: null,
        status: 400,
      });
    }

    for (let index = 0; index < images.length; index++) {
      const item = images[index];

      await prisma.productImage.update({
        where: { id: item.id },
        data: {
          altText: item.altText,
          isPrimary: index === 0,
          displayOrder: index + 1,
        },
      });
    }

    return Response({
      success: true,
      message: "Successfully update product images order!",
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to update product images order!",
      data: error,
      status: 500,
    });
  }
}
