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

          for (const district of districts) {
            const villageRes = await fetch(
              `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${district.id}.json`
            );
            const villages = await villageRes.json();

            await prisma.village.createMany({
              data: villages.map((village: any) => ({
                districtId: district.id,
                villageId: village.id,
                name: village.name,
              })),
            });
          }
        }
      }
    }

    return Response({
      success: true,
      message: "Successfully insert villages data!",
      status: 201,
    });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:27 ~ POST ~ error:", error);

    return Response({
      success: false,
      message: "Failed to insert villages data!",
      data: error,
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { districtId, villageId } = await req.json();

    let data;
    if (villageId) {
      data = await prisma.village.findUnique({
        where: { id: villageId },
        include: { district: true },
      });
    }

    if (districtId) {
      data = await prisma.village.findMany({
        where: { districtId },
        include: { district: true },
      });
    }

    if (!villageId && !districtId) {
      data = await prisma.village.findMany({ include: { district: true } });
    }

    return Response({
      success: true,
      message: "Successfully get villages data!",
      data,
      status: 200,
    });
  } catch (error) {
    console.log("🚀 ~ [GET VILLAGES] ~file: route.ts:64 ~ GET ~ error:", error);

    return Response({
      success: false,
      message: "Failed to get villages data!",
      data: error,
      status: 500,
    });
  }
}
