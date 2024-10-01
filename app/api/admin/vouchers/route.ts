import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const {
      code,
      description,
      type,
      value,
      startDate,
      endDate,
      usageLimit,
      minPurchaseAmount,
    } = await req.json();

    // Create new voucher to db
    const newVoucher = await prisma.voucher.create({
      data: {
        code,
        description,
        type,
        value,
        startDate,
        endDate,
        usageLimit,
        minPurchaseAmount,
        isActive: true,
      },
    });

    return Response({
      success: true,
      message: "Successfully created a new voucher!",
      data: newVoucher,
      status: 201,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to created a new voucher!",
      data: error,
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let vouchers;
    const isActive = req.nextUrl.searchParams.get("isActive");

    if (isActive === "active") {
      vouchers = await prisma.voucher.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "asc" },
      });
    } else {
      vouchers = await prisma.voucher.findMany({
        orderBy: { createdAt: "asc" },
      });
    }

    return Response({
      success: true,
      message: "Successfully get all voucher!",
      data: vouchers,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to get all voucher!",
      data: error,
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const {
      id,
      code,
      description,
      type,
      value,
      startDate,
      endDate,
      usageLimit,
      usageCount,
      minPurchaseAmount,
    } = await req.json();

    // Check for valid voucher ID
    if (!id) {
      return Response({
        success: false,
        message: "Invalid voucher ID!",
        data: null,
        status: 400,
      });
    }

    // Find existing voucher
    const voucher = await prisma.voucher.findUnique({
      where: { id },
    });

    if (!voucher) {
      return Response({
        success: false,
        message: "Voucher not exists!",
        data: null,
        status: 404,
      });
    }

    // Update voucher
    const updatedVoucher = await prisma.voucher.update({
      where: { id },
      data: {
        code,
        description,
        type,
        value,
        startDate,
        endDate,
        usageLimit,
        usageCount,
        minPurchaseAmount,
      },
    });

    return Response({
      success: true,
      message: "Successfully updated voucher data!",
      data: updatedVoucher,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated voucher data!",
      data: error,
      status: 500,
    });
  }
}
