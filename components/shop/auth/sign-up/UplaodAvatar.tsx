// Modules
import React from "react";
import Image from "next/image";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";

// Components
import { Button } from "@/components/ui/button";

// Schema
import RadioButton from "@/components/shared/form/RadioButton";
import ImageUpload from "@/components/shared/form/ImageUpload";
import SingleCheckbox from "@/components/shared/form/SingleCheckbox";

// Utils
import { cn } from "@/lib/utils";
import { avatars } from "@/constants";

// Schema
import { UserSignUpSchema } from "@/lib/validations";

type SignUpFormData = z.infer<typeof UserSignUpSchema>;

interface UploadAvatarProps {
  form: ReturnType<typeof useForm<SignUpFormData>>;
  isLoading: boolean;
}

export default function UploadVatar({ form, isLoading }: UploadAvatarProps) {
  const { control, watch } = form;
  const avatarType = watch("avatarType");
  const presetAvatar = watch("presetAvatar");

  return (
    <>
      <div className="w-[400px] space-y-4 rounded-2xl bg-slate-50 px-4 py-2 lg:px-6 lg:py-3">
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
          <ImageUpload
            control={control}
            label="Upload own avatar"
            name="image"
            imagePreviewSize={{
              width: 200,
              height: 200,
            }}
            required
          />
        )}
      </div>

      {/* Terms */}
      <div className="flex w-full justify-start">
        <SingleCheckbox
          control={form.control}
          name="agreement"
          label="I agree with Terms and Policy"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full rounded-[36px] bg-primary px-4 py-6 font-poppins text-sm font-bold leading-none text-white lg:text-base"
      >
        Sign Up
      </Button>
    </>
  );
}
