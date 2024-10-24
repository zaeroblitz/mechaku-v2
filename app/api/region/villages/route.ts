import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    /*  const provinceRes = await fetch(
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
    } */

    const csvFilePath = path.join(process.cwd(), "public/csv", "villages.csv");
    const fileContent = fs.readFileSync(csvFilePath, "utf-8");

    // Parse CSV
    const records = parse(fileContent, {
      columns: false,
      skip_empty_lines: true,
      trim: true,
      bom: true,
      delimiter: ",",
    });

    // Simpan data ke database menggunakan Prisma
    for (const record of records) {
      await prisma.village.create({
        data: {
          villageId: record[0],
          districtId: record[1],
          name: record[2],
        },
      });
    }

    return Response({
      success: true,
      message: "Successfully insert villages data!",
      status: 201,
    });
  } catch (error) {
    console.error("🚀 ~ file: route.ts:27 ~ POST ~ error:", error);

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
    const districtId = req.nextUrl.searchParams.get("districtId");
    const villageId = req.nextUrl.searchParams.get("villageId");

    if (!districtId && !villageId) {
      return Response({
        success: false,
        message: "Please provide either districtId or villageId!",
        status: 400,
      });
    }

    let data;
    if (villageId) {
      data = await prisma.village.findMany({
        where: { id: villageId },
        include: { district: true },
      });
    }

    if (districtId) {
      data = await prisma.village.findMany({
        where: { district: { id: districtId } },
        include: { district: true },
      });
    }

    return Response({
      success: true,
      message: "Successfully get villages data!",
      data,
      status: 200,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [GET VILLAGES] ~file: route.ts:64 ~ GET ~ error:",
      error
    );

    return Response({
      success: false,
      message: "Failed to get villages data!",
      data: error,
      status: 500,
    });
  }
}
