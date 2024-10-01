// Modules
import { NextRequest, NextResponse } from "next/server";

// Libraries
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";
import { uploadFiles } from "@/lib/upload";
import { ProductStatus } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Get form data
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const dimensions = formData.get("dimensions") as string;
    const weight = parseFloat(formData.get("weight") as string) ?? 0;
    const price = parseFloat(formData.get("price") as string);
    const quantity = parseInt(formData.get("quantity") as string, 10);
    const seriesId = formData.get("seriesId") as string;
    const brandId = formData.get("brandId") as string | null;
    const gradeId = formData.get("gradeId") as string | null;
    const files = formData.getAll("images") as File[];

    // Upload files to Firebase Storage
    const fileUrls = await uploadFiles(files, "products");

    // Create a new product in the database
    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        dimensions,
        weight,
        price,
        quantity,
        status: "DRAFT",
        series: { connect: { id: seriesId } },
        ...(brandId && { brand: { connect: { id: brandId } } }),
        ...(gradeId && { grade: { connect: { id: gradeId } } }),
        images: {
          createMany: {
            data: fileUrls.map((file, index) => ({
              imageUrl: file.url,
              altText: file.alt,
              isPrimary: index === 0,
              displayOrder: index + 1,
            })),
          },
        },
      },
      include: {
        images: true,
        series: true,
        brand: true,
        grade: true,
      },
    });

    return Response({
      success: true,
      data: newProduct,
      message: "Product created successfully!",
      status: 201,
    });
  } catch (error) {
    return Response({
      success: false,
      status: 500,
      data: error,
      message: "Failed to create a new product!",
    });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    let fileUrls;
    let updateData;
    let include;

    // Get form data
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const status = formData.get("status") as ProductStatus;
    const description = formData.get("description") as string;
    const dimensions = formData.get("dimensions") as string;
    const weight = parseFloat(formData.get("weight") as string) ?? 0;
    const price = parseFloat(formData.get("price") as string);
    const quantity = parseInt(formData.get("quantity") as string, 10);
    const seriesId = formData.get("seriesId") as string;
    const brandId = formData.get("brandId") as string | null;
    const gradeId = formData.get("gradeId") as string | null;
    const files = formData?.getAll("images") as File[];

    if (!id) {
      return Response({
        success: false,
        status: 400,
        data: null,
        message: "Product ID is required!",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { displayOrder: "desc" },
          take: 1,
        },
      },
    });

    if (!product) {
      return Response({
        success: false,
        status: 404,
        data: null,
        message: "Product not found!",
      });
    }

    const lastImageOrder = product?.images[0].displayOrder || 0;

    if (files && files?.length > 0) {
      fileUrls = await uploadFiles(files, "products");
      updateData = {
        name,
        slug,
        description,
        dimensions,
        weight,
        price,
        quantity,
        status,
        series: { connect: { id: seriesId } },
        ...(brandId && { brand: { connect: { id: brandId } } }),
        ...(gradeId && { grade: { connect: { id: gradeId } } }),
        images: {
          createMany: {
            data: fileUrls.map((file, index) => ({
              imageUrl: file.url,
              altText: file.alt,
              isPrimary: lastImageOrder + index === 0,
              displayOrder: lastImageOrder + index + 1,
            })),
          },
        },
      };
      include = {
        images: true,
        series: true,
        brand: true,
        grade: true,
      };
    } else {
      updateData = {
        name,
        slug,
        description,
        dimensions,
        weight,
        price,
        quantity,
        status,
        series: { connect: { id: seriesId } },
        ...(brandId && { brand: { connect: { id: brandId } } }),
        ...(gradeId && { grade: { connect: { id: gradeId } } }),
      };
      include = {
        series: true,
        brand: true,
        grade: true,
      };
    }

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
      include,
    });

    return Response({
      success: true,
      data: updatedProduct,
      message: "Product created successfully!",
      status: 201,
    });
  } catch (error) {
    return Response({
      success: false,
      status: 500,
      data: error,
      message: "Failed to create a new product!",
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const products = await prisma.product.findMany({
      include: {
        series: {
          select: {
            id: true,
            title: true,
          },
        },
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
        grade: {
          select: {
            id: true,
            name: true,
          },
        },
        images: {
          orderBy: { displayOrder: "asc" },
          take: 1,
          select: {
            id: true,
            imageUrl: true,
            altText: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!products) {
      return Response({
        success: false,
        status: 404,
        message: "No products found!",
      });
    }

    return Response({
      success: true,
      data: products,
      message: "Successfully products data!",
    });
  } catch (error) {
    return Response({
      success: false,
      status: 500,
      data: error,
      message: "Failed to get products!",
    });
  }
}
