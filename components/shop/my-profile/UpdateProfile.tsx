"use client";

// Modules
import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Icons
import { Mail, Pencil, SaveIcon, User } from "lucide-react";

// Shadcn Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Custom Components
import TextInput from "@/components/shared/form/TextInput";
import NumberInput from "@/components/shared/form/NumberInput";
import RadioButton from "@/components/shared/form/RadioButton";
import AvatarUpload from "@/components/shared/form/AvatarUpload";

// Utils
import { cn } from "@/lib/utils";
import { avatars } from "@/constants";
import { UpdateUserSchema } from "@/lib/validations";
import { useUpdateUserMutation } from "@/services/user";

interface Props {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export default function UpdateProfile({ id, name, email, phoneNumber }: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name,
      email,
      phoneNumber: +phoneNumber.replace("+62", ""),
      avatarType: "preset",
      image: undefined,
      presetAvatar: "",
    },
  });

  const { control, watch } = form;
  const avatarType = watch("avatarType");
  const presetAvatar = watch("presetAvatar");

  const onSubmit = async (data: z.infer<typeof UpdateUserSchema>) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phoneNumber", `+62${data.phoneNumber}`);

      if (data.image) {
        formData.append("image", data.image);
      }

      if (data.presetAvatar) {
        formData.append("presetAvatar", data.presetAvatar);
      }

      await updateUser(formData).unwrap();

      toast({
        title: "Success Update Profile!",
        description: "You have successfully updated your profile.",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        title: "Update Profile Failed!",
        description:
          "There was an error updating your profile. Please try again later.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex items-center gap-2 rounded-xl bg-violet-100 px-6 py-3 font-lexend text-xs text-accent-purple transition duration-300 hover:bg-accent-purple hover:text-violet-100 lg:text-sm">
          <Pencil size={12} /> Update Profile
        </div>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="rounded-2xl bg-white p-8"
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-center flex w-full flex-col gap-3 lg:gap-4"
          >
            {/* Avatar */}
            <div className="flex w-full flex-col justify-start gap-2">
              <label className="font-lexend text-form-label">Avatar</label>
              <div className="w-full space-y-4 rounded-2xl bg-slate-50 px-4 py-2 lg:px-6 lg:py-3">
                <RadioButton
                  control={form.control}
                  name="avatarType"
                  defaultValue="preset"
                  direction="horizontal"
                  options={[
                    {
                      label: "Preset Avatar",
                      value: "preset",
                    },
                    {
                      label: "Upload Avatar",
                      value: "upload",
                    },
                  ]}
                />

                {avatarType === "preset" && presetAvatar && (
                  <div className="flex-center flex size-[100px] w-full rounded-full">
                    <Image
                      src={presetAvatar}
                      alt="preset avatar"
                      width={100}
                      height={100}
                      className="rounded-full object-cover object-center"
                    />
                  </div>
                )}

                {avatarType === "preset" && (
                  <Controller
                    name="presetAvatar"
                    control={control}
                    render={({ field }) => (
                      <div className="grid grid-cols-5 gap-2">
                        {avatars.map((avatar) => (
                          <div
                            key={avatar.path}
                            className={cn(
                              "size-[50px] bg-slate-200 rounded-full transition duration-500 cursor-pointer",
                              presetAvatar === avatar.path &&
                                "border-4 border-accent-purple"
                            )}
                            onClick={() => field.onChange(avatar.path)}
                          >
                            <Image
                              src={avatar.path}
                              alt={avatar.label}
                              width={50}
                              height={50}
                              className="rounded-full object-cover object-center"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  />
                )}

                {avatarType === "upload" && (
                  <AvatarUpload
                    control={control}
                    label="Upload own avatar"
                    name="image"
                  />
                )}
              </div>
            </div>

            {/* Email */}
            <TextInput
              control={form.control}
              name="email"
              label="Email"
              icon={<Mail size={14} />}
              placeholder="johndoe@example.com"
              disabled
              className="bg-white py-6"
            />

            {/* Name */}
            <TextInput
              control={form.control}
              name="name"
              label="Full Name"
              icon={<User size={14} />}
              placeholder="John Doe"
              required
              className="bg-white py-6"
            />

            {/* Phone Number */}
            <NumberInput
              control={form.control}
              name="phoneNumber"
              label="Phone Number"
              placeholder="8134567890"
              unit="+62"
              unitPosition="left"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="flex w-full gap-2 rounded-2xl bg-accent-purple text-center font-lexend font-semibold text-white transition duration-300 hover:bg-accent-purple/90"
            >
              {isLoading ? (
                "Updating..."
              ) : (
                <>
                  <SaveIcon size={14} /> Update Profile
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
