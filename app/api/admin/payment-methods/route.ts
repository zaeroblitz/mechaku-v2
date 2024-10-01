import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NewPaymentMethodSchema } from "@/lib/validations";
import Response from "@/lib/api.response";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name, isActive } = await req.json();

    // Validations
    NewPaymentMethodSchema.parse({ name, isActive });

    // Create new payment method to db
    const newPaymentMethod = await prisma.paymentMethod.create({
      data: {
        name,
        isActive,
      },
    });

    return Response({
      success: true,
      message: "Successfully created a new payment method!",
      data: newPaymentMethod,
      status: 201,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to created a new payment method!",
      data: error,
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let paymentMethods;
    const isActive = req.nextUrl.searchParams.get("isActive");

    if (isActive === "active") {
      paymentMethods = await prisma.paymentMethod.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "asc" },
      });
    } else {
      paymentMethods = await prisma.paymentMethod.findMany({
        orderBy: { createdAt: "asc" },
      });
    }

    return Response({
      success: true,
      message: "Successfully get all payment methods!",
      data: paymentMethods,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to get all payment methods!",
      data: error,
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { id, name, isActive } = await req.json();

    // Validations
    NewPaymentMethodSchema.parse({ name, isActive });

    // Check for valid payment method ID
    if (!id) {
      return Response({
        success: false,
        message: "Invalid payment method ID!",
        data: null,
        status: 400,
      });
    }

    // Find existing paymentMethod
    const paymentMethod = await prisma.paymentMethod.findUnique({
      where: { id },
    });

    if (!paymentMethod) {
      return Response({
        success: false,
        message: "Payment method not exists!",
        data: null,
        status: 404,
      });
    }

    // Update paymentMethod
    const updatedPaymentMethod = await prisma.paymentMethod.update({
      where: { id },
      data: {
        name,
        isActive,
      },
    });

    return Response({
      success: true,
      message: "Successfully updated payment method data!",
      data: updatedPaymentMethod,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated payment method data!",
      data: error,
      status: 500,
    });
  }
}
