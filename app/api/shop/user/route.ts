import { NextRequest } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/upload";
import Response from "@/lib/api.response";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/lib/firebase.config";

export async function PUT(req: NextRequest, params: Params) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const image = formData.get("image") as File | null;
    const presetAvatar = formData.get("presetAvatar") as string | null;

    if (!id) {
      return Response({
        success: false,
        message: "Invalid user ID!",
        data: null,
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return Response({
        success: false,
        message: "User not found!",
        data: null,
        status: 404,
      });
    }

    let avatarUrl;
    if (image) {
      // Delete existing avatar
      const imageRef = ref(storage, user.avatar);
      await deleteObject(imageRef);

      // Upload the new one
      const imageUrl = await uploadFile(image, "avatars");

      avatarUrl = imageUrl.url;
    }

    if (presetAvatar) {
      avatarUrl = presetAvatar;
    }

    let data;
    if (avatarUrl) {
      data = {
        name,
        email,
        phone_number: phoneNumber,
        avatar: avatarUrl,
      };
    } else {
      data = {
        name,
        email,
        phone_number: phoneNumber,
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return Response({
      success: true,
      message: "Successfully update user profile!",
      data: updatedUser,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to get update user profile!",
      data: error,
      status: 500,
    });
  }
}
