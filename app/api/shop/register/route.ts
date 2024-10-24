import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";
import { uploadFile } from "@/lib/upload";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();
    const name = formData.get("name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const phoneNumber = formData.get("phoneNumber")?.toString() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const avatarType = formData.get("avatarType")?.toString() ?? "";
    const presetAvatar = formData.get("presetAvatar")?.toString() ?? "";
    const image = formData.get("image") as File;

    const hashedPassword = await bcrypt.hash(password, 10);
    let imageUrl;

    if (avatarType === "preset") {
      imageUrl = presetAvatar;
    }

    if (avatarType === "upload") {
      const firebaseStorageRes = await uploadFile(image, "avatars");
      imageUrl = firebaseStorageRes.url;
    }

    if (!imageUrl) {
      return Response({
        success: false,
        message: "Invalid avatar type!",
        data: [],
        status: 400,
      });
    }

    const registeredUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar: imageUrl,
        phone_number: phoneNumber,
      },
    });

    return Response({
      success: true,
      message: "Register successfull!",
      data: registeredUser,
      status: 201,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [Shop - Sign Up] ~ file: route.ts:33 ~ POST ~ error:",
      error
    );
    return Response({
      success: false,
      message: "Register failed!",
      data: error,
      status: 500,
    });
  }
}
