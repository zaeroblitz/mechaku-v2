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

        for (const regency of regencies) {
          const districtRes = await fetch(
            `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regency.id}.json`
          );
          const districts = await districtRes.json();

          await prisma.district.createMany({
            data: districts.map((district: any) => ({
              regencyId: regency.id,
              districtId: district.id,
              name: district.name,
            })),
          });
        }
      }
    }

    return Response({
      success: true,
      message: "Successfully insert regencies data!",
      status: 201,
    });
  } catch (error) {
    console.log(
      "🚀 ~ [INSERT DISTRICTS] ~ file: route.ts:27 ~ POST ~ error:",
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
    const districtId = req.nextUrl.searchParams.get("districtId");
    const regencyId = req.nextUrl.searchParams.get("regencyId");

    if (!districtId && !regencyId) {
      return Response({
        success: false,
        message: "Please provide districtId or regencyId!",
        status: 400,
      });
    }

    let data;
    if (districtId) {
      data = await prisma.district.findMany({
        where: { districtId },
      });
    }

    if (regencyId) {
      data = await prisma.district.findMany({
        where: { regency: { id: regencyId } },
      });
    }

    return Response({
      success: true,
      message: "Successfully get districts data!",
      data,
      status: 200,
    });
  } catch (error) {
    console.log(
      "🚀 ~ [GET DISTRICTS] ~ file: route.ts:57 ~ GET ~ error:",
      error
    );
    return Response({
      success: false,
      message: "Failed to get data!",
      data: error,
      status: 500,
    });
  }
}
