import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return Response({
        success: false,
        message: "User ID is required!",
        status: 400,
      });
    }

    const address = await prisma.userAddress.findMany({
      where: { userId },
      include: {
        province: true,
        regency: true,
        district: true,
        village: true,
      },
    });

    return Response({
      success: true,
      message: "Successfully fetched address data!",
      data: address,
      status: 200,
    });
  } catch (error) {
    console.error("🚀 ~ [GET ADDRESS]~ file: route.ts:9 ~ GET ~ error:", error);

    return Response({
      success: false,
      message: "Failed to get address data!",
      data: error,
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      label,
      address,
      provinceId,
      regencyId,
      districtId,
      villageId,
      zipCode,
      phoneNumber,
    } = await req.json();

    if (
      !userId ||
      !label ||
      !address ||
      !provinceId ||
      !regencyId ||
      !districtId ||
      !villageId ||
      !zipCode
    ) {
      return Response({
        success: false,
        message: "All fields are required!",
        status: 400,
      });
    }

    const newAddress = await prisma.userAddress.create({
      data: {
        userId,
        label,
        address,
        provinceId,
        regencyId,
        districtId,
        villageId,
        zipCode,
        phone_number: phoneNumber,
        isPrimary: false,
      },
    });

    return Response({
      success: true,
      message: "Successfully inserted address data!",
      data: newAddress,
      status: 201,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [INSERT ADDRESS] file: route.ts:43 ~ POST ~ error:",
      error
    );

    return Response({
      success: false,
      message: "Failed to insert address data!",
      data: error,
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const {
      id,
      label,
      address,
      provinceId,
      regencyId,
      districtId,
      villageId,
      zipCode,
      phoneNumber,
    } = await req.json();

    const updatedAddress = await prisma.userAddress.update({
      where: { id },
      data: {
        label,
        address,
        provinceId,
        regencyId,
        districtId,
        villageId,
        zipCode,
        phone_number: phoneNumber,
      },
    });

    if (!updatedAddress) {
      return Response({
        success: false,
        message: "Address not found!",
        status: 404,
      });
    }

    return Response({
      success: true,
      message: "Successfully updated address data!",
      data: updatedAddress,
      status: 201,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [UPDATE ADDRESS] file: route.ts:43 ~ POST ~ error:",
      error
    );

    return Response({
      success: false,
      message: "Failed to update address data!",
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
        message: "Address ID is required!",
        status: 400,
      });
    }

    const deletedAddress = await prisma.userAddress.delete({
      where: { id },
    });

    if (!deletedAddress) {
      return Response({
        success: false,
        message: "Address not found!",
        status: 404,
      });
    }

    return Response({
      success: true,
      message: "Successfully deleted address data!",
      data: deletedAddress,
      status: 200,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [DELETE ADDRESS] ~ file: route.ts:160 ~ DELETE ~ error:",
      error
    );
    return Response({
      success: false,
      message: "Failed to delete address data!",
      data: error,
      status: 500,
    });
  }
}
