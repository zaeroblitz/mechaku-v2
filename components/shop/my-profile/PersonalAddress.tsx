"use client";

// Modules
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Icons
import { Edit, PlusCircle, Trash, Trash2, XIcon } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  useGetAllAddresssQuery,
  useRemoveAddressMutation,
} from "@/services/address";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function PersonalAddress() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: address, isLoading } = useGetAllAddresssQuery({
    userId: session?.user.id,
  });

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6 rounded-2xl bg-slate-50 p-8 lg:w-2/3 lg:p-10">
        <div className="flex w-full flex-wrap gap-6">
          <Skeleton className="size-[236px] rounded-2xl bg-slate-200 object-cover" />
          <Skeleton className="size-[236px] rounded-2xl bg-slate-200 object-cover" />
          <Skeleton className="size-[236px] rounded-2xl bg-slate-200 object-cover" />
          <Skeleton className="size-[236px] rounded-2xl bg-slate-200 object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl bg-slate-50 p-8 lg:w-2/3 lg:p-10">
      <h2 className="font-poppins text-xl font-bold text-primary">
        My Shipping Address
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {address && address.data.length > 0 ? (
          <>
            {address.data.map((item) => (
              <AddressCard
                key={item.id}
                id={item.id}
                label={item.label}
                province={item.province.name}
                regency={item.regency.name}
                district={item.district.name}
                village={item.village.name}
                address={item.address}
                zipCode={item.zipCode}
                phoneNumber={item.phone_number}
                onEdit={() =>
                  router.push(`/my-profile/address/edit/${item.id}`)
                }
              />
            ))}
            <Card
              className="flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white transition duration-300 hover:bg-gray-50"
              onClick={() => router.push("/my-profile/address/create")}
            >
              <CardContent className="py-16 text-center">
                <PlusCircle className="mx-auto mb-2 size-8 text-gray-400" />
                <p className="font-lexend text-sm font-medium text-slate-500">
                  Add New Address
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card
            className="flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white transition duration-300 hover:bg-gray-50"
            onClick={() => router.push("/my-profile/address/create")}
          >
            <CardContent className="py-16 text-center">
              <PlusCircle className="mx-auto mb-2 size-8 text-gray-400" />
              <p className="font-lexend text-sm font-medium text-slate-500">
                Add New Address
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

interface AddressCardProps {
  id: string;
  label: string;
  province: string;
  regency: string;
  district: string;
  village: string;
  address: string;
  zipCode: string;
  phoneNumber?: string;
  onEdit: () => void;
}

function AddressCard({
  id,
  label,
  province,
  regency,
  district,
  village,
  address,
  zipCode,
  phoneNumber,
  onEdit,
}: AddressCardProps) {
  return (
    <Card className="rounded-2xl bg-white font-lexend">
      <CardContent className="p-4">
        <div className="mb-2 flex w-full items-center justify-end gap-1">
          <Button
            onClick={onEdit}
            variant="outline"
            size="sm"
            className="border border-slate-100 text-secondary hover:bg-slate-100"
          >
            <Edit size={14} />
          </Button>
          <DeleteDialog id={id} />
        </div>
        <div className="mb-2 flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">{label}</h3>
          </div>
        </div>
        <div className="mb-4 text-sm text-gray-600">
          <p>
            {province}, {regency}
          </p>
          <p>
            {district}, {village}
          </p>
          <p>{address}</p>
          <p>{zipCode}</p>
          <p>{phoneNumber}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface DeleteDialogProps {
  id: string;
}

function DeleteDialog({ id }: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [removeAddress] = useRemoveAddressMutation();

  const handleRemove = async () => {
    try {
      await removeAddress({ id });
      toast({
        title: "Address deleted successfully",
        description: "Your address has been deleted successfully.",
        className: "rounded-2xl bg-green-50 text-green-800",
        duration: 2000,
      });

      setOpen(false);
    } catch (error) {
      toast({
        title: "Failed to delete address",
        description:
          "There was an error while deleting the address. Please try again later.",
        className: "rounded-2xl bg-pink-50 text-pink-800",
        duration: 2000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="outline"
          size="sm"
          className="border border-rose-50 text-rose-400 hover:bg-rose-100"
        >
          <Trash2 size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl bg-white p-5 font-lexend">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            address and remove it from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-center flex w-full gap-6">
          <Button
            className="flex-center flex gap-2 rounded-full bg-neutral-100 px-8 py-3 text-neutral-800 hover:bg-neutral-200"
            onClick={() => setOpen(false)}
          >
            <XIcon size={16} /> <p>Cancel</p>
          </Button>
          <Button
            className="flex-center flex gap-2 rounded-full bg-rose-500 px-8 py-3 text-rose-50 hover:bg-rose-600"
            onClick={handleRemove}
          >
            <Trash size={16} /> <p>Delete</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
