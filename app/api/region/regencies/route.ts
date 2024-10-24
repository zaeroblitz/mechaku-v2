import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const provinceRes = await fetch(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );
    const provinces = await provinceRes.json();

    if (provinces) {
      for (const province of provinces) {
        const regencyres = await fetch(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${province.id}.json`
        );
        const regencies = await regencyres.json();

        await prisma.regency.createMany({
          data: regencies.map((regency: any) => ({
            provinceId: province.id,
            regencyId: regency.id,
            name: regency.name,
          })),
        });
      }
    }

    return Response({
      success: true,
      message: "Successfully insert regencies data!",
      status: 201,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [INSERT REGENCIES] ~ file: route.ts:27 ~ POST ~ error:",
      error
    );

    return Response({
      success: false,
      message: "Failed to insert regencies data!",
      data: error,
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const regencyId = req.nextUrl.searchParams.get("regencyId");
    const provinceId = req.nextUrl.searchParams.get("provinceId");

    if (!regencyId && !provinceId) {
      return Response({
        success: false,
        message: "Please provide regencyId or provinceId!",
        status: 400,
      });
    }

    let data;
    if (regencyId) {
      data = await prisma.regency.findMany({
        where: { regencyId },
        include: { province: true },
      });
    }

    if (provinceId) {
      data = await prisma.regency.findMany({
        where: { province: { id: provinceId } },
        include: { province: true },
      });
    }

    return Response({
      success: true,
      message: "Successfully get regencies data!",
      data,
      status: 200,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [GET REGENCIES] ~ file: route.ts:50 ~ GET ~ error:",
      error
    );

    return Response({
      success: false,
      message: "Failed to get regencies data!",
      data: error,
      status: 500,
    });
  }
}
