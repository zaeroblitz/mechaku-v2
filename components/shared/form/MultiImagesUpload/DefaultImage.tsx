import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { deleteObject, ref } from "firebase/storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { XIcon } from "lucide-react";
import { storage } from "@/lib/firebase.config";
import { useDeleteProductImageMutation } from "@/services/product-images";

interface DefaultImageProps {
  url: string;
  imageId: string;
  productId: string;
  onImageDelete?: (imageId: string) => void;
}

export function DefaultImage({
  url,
  imageId,
  productId,
  onImageDelete,
}: DefaultImageProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [deleteImage] = useDeleteProductImageMutation();

  const handleDelete = async () => {
    try {
      const imageRef = ref(storage, url);
      await deleteObject(imageRef);
      await deleteImage({ id: imageId, productId }).unwrap();

      toast({
        title: "Image deleted successfully",
        description: "The selected image has been deleted.",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });

      if (onImageDelete) {
        onImageDelete(imageId);
      }

      router.refresh();
    } catch (error) {
      toast({
        title: "Error deleting image",
        description: "Failed to delete the image. Please try again later.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    }
  };

  return (
    <div className="relative">
      <Image
        src={url}
        alt="Previous Images"
        width={200}
        height={200}
        className="rounded-2xl object-cover"
      />

      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex-center absolute -right-2 -top-2 flex size-8 cursor-pointer rounded-xl bg-rose-50 text-rose-500 transition duration-300 hover:scale-110 hover:bg-rose-500 hover:text-rose-50">
            <XIcon size={14} />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-2xl bg-white p-8 font-lexend">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              selected image and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl border-none bg-slate-50 text-slate-500 transition duration-300 hover:bg-slate-500 hover:text-slate-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl bg-rose-50 text-rose-500 transition duration-300 hover:bg-rose-500 hover:text-rose-50 "
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
