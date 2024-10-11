import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return Response({
        success: false,
        message: "Missing user ID!",
        data: null,
        status: 400,
      });
    }

    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        user: true,
        items: true,
      },
    });

    return Response({
      success: true,
      message: "Successfully get cart data!",
      data: cart,
      status: 200,
    });
  } catch (error) {
    console.log("🚀 ~ [GET CARTS] ~ file: route.ts:8 ~ GET ~ error:", error);

    return Response({
      success: false,
      message: "Failed to get cart data!",
      data: error,
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { cartId, userId, productId, quantity } = await req.json();

    if (!userId || !productId || quantity <= 0) {
      return Response({
        success: false,
        message: "Invalid input data!",
        status: 400,
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return Response({
        success: false,
        message: "Product not found!",
        status: 404,
      });
    }

    let cart = cartId
      ? await prisma.cart.findUnique({ where: { id: cartId } })
      : null;

    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: { cartId, productId },
    });

    let updatedQuantity;
    if (existingCartItem) {
      updatedQuantity = Math.min(
        existingCartItem.quantity + quantity,
        product.quantity
      );
    } else {
      updatedQuantity = Math.min(quantity, product.quantity);
    }

    const cartItem = await prisma.cartItem.upsert({
      where: { id: cartId, productId },
      update: { quantity: updatedQuantity },
      create: { cartId: cart.id, productId, quantity: updatedQuantity },
    });

    return Response({
      success: true,
      message: "New item successfully added to cart!",
      data: cartItem,
      status: 200,
    });
  } catch (error) {
    console.log(
      "🚀 ~ [INSERT CART] ~ file: route.ts:50 ~ POST ~ error:",
      error
    );
    return Response({
      success: false,
      message: "Failed to add new item to cart!",
      data: error,
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return Response({
        success: false,
        message: "Missing cart item ID!",
        status: 400,
      });
    }

    const deletedItem = await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    if (!deletedItem) {
      return Response({
        success: false,
        message: "Cart item not found!",
        status: 404,
      });
    }

    return Response({
      success: true,
      message: "Item successfully removed from cart!",
      status: 200,
    });
  } catch (error) {
    console.log(
      "🚀 ~ [DELETE CART]~ file: route.ts:122 ~ DELETE ~ error:",
      error
    );
    return Response({
      success: false,
      message: "Failed to remove item from cart!",
      data: error,
      status: 500,
    });
  }
}
