import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const payload = await req.json();
    const id = payload.id;
    const status = payload.status;

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
        message: "Voucher not found!",
        data: null,
        status: 404,
      });
    }

    // Update the voucher in the database
    const updatedVoucher = await prisma.voucher.update({
      where: { id },
      data: {
        isActive: status,
      },
    });

    return Response({
      success: true,
      message: "Successfully updated voucher status!",
      data: updatedVoucher,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated voucher status!",
      data: error,
      status: 500,
    });
  }
}
