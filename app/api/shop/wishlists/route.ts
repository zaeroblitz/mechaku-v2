import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return Response({
        success: false,
        message: "Invalid user ID!",
        data: null,
        status: 400,
      });
    }

    const wishlists = await prisma.wishlist.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      include: {
        product: true,
        user: true,
      },
    });

    return Response({
      success: true,
      message: "Wishlists retrieved successfully!",
      data: wishlists,
      status: 200,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [GET WISHLISTS] ~ file: route.ts:9 ~ GET ~ error:",
      error
    );
    return Response({
      success: false,
      message: "Failed to get wishlists data!",
      data: error,
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return Response({
        success: false,
        message: "Invalid user or product ID!",
        data: null,
        status: 400,
      });
    }

    const newWishlist = await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });

    return Response({
      success: true,
      message: "New item added to wishlist successfully!",
      data: newWishlist,
      status: 201,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [INSERT WISHLIST] ~ file: route.ts:54 ~ POST ~ error:",
      error
    );
    return Response({
      success: false,
      message: "Failed to added new item to wishlist!",
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
        message: "Invalid wishlist item ID!",
        data: null,
        status: 400,
      });
    }

    const deletedWishlist = await prisma.wishlist.delete({
      where: { id },
    });

    if (!deletedWishlist) {
      return Response({
        success: false,
        message: "Wishlist item not found!",
        data: null,
        status: 404,
      });
    }

    return Response({
      success: true,
      message: "Wishlist item deleted successfully!",
      data: deletedWishlist,
      status: 200,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [DELETE WISHLIST] ~ file: route.ts:91 ~ DELETE ~ error:",
      error
    );
    return Response({
      success: false,
      message: "Failed to delete wishlist item!",
      data: error,
      status: 500,
    });
  }
}
