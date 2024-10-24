import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";

export async function PUT(req: NextRequest) {
  try {
    const { id, action } = await req.json();

    if (!id || !action) {
      return Response({
        success: false,
        message: "Invalid input data!",
        status: 400,
      });
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });

    if (!cartItem) {
      return Response({
        success: false,
        message: "Cart Item not found!",
        data: null,
        status: 400,
      });
    }

    if (action === "increase") {
      const quantity = Math.min(
        cartItem.quantity + 1,
        cartItem.product.quantity
      );

      await prisma.cartItem.update({
        where: { id },
        data: { quantity },
      });
    }

    if (action === "decrease") {
      const quantity = Math.max(1, cartItem.quantity - 1);

      await prisma.cartItem.update({
        where: { id },
        data: { quantity },
      });
    }

    return Response({
      success: true,
      message: "Cart Item updated successfully!",
      data: cartItem,
      status: 200,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [CART ITEM ACTION] ~ file: route.ts:63 ~ PUT ~ error:",
      error
    );
    return Response({
      success: false,
      message: "Failed to update cart item!",
      data: error,
      status: 500,
    });
  }
}
