"use client";

// Modules
import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Shadcn Components
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Page Components
import Banner from "@/components/shop/auth/Banner";
import Stepper from "@/components/shop/auth/sign-up/Stepper";
import SignUpForm from "@/components/shop/auth/sign-up/SignUpForm";
import UploadVatar from "@/components/shop/auth/sign-up/UplaodAvatar";

// Query
import { useCreateUserMutation } from "@/services/user";

// Schema
import { UserSignUpSchema } from "@/lib/validations";
import Link from "next/link";

export default function Page() {
  const { toast } = useToast();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [currentStep, setCurrentStep] = useState<"form" | "avatar">("form");

  const form = useForm<z.infer<typeof UserSignUpSchema>>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreement: false,
      avatarType: "preset",
      image: undefined,
      presetAvatar: "",
    },
  });

  const handleNextStep = () => {
    if (currentStep === "form") {
      setCurrentStep("avatar");
    }
  };

  const handleStepperClick = (step: "form" | "avatar") => {
    if (isLoading) return;

    if (step === "form") {
      setCurrentStep("form");
    } else {
      setCurrentStep("avatar");
    }
  };

  const onSubmit = async (values: z.infer<typeof UserSignUpSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phoneNumber", `+62${values.phoneNumber}`);
    formData.append("password", values.password);
    formData.append("avatarType", values.avatarType);

    if (values.avatarType === "preset") {
      formData.append("presetAvatar", values.presetAvatar as string);
    } else {
      formData.append("image", values.image as File);
    }

    try {
      await createUser(formData).unwrap();

      toast({
        title: "Success!",
        description: "User account created successfully!",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Failed to sign up. Please try again later.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    }
  };

  return (
    <div className="flex-center flex min-h-screen w-full bg-white p-6 xl:p-0">
      <div className="flex-center flex size-full max-w-screen-2xl flex-col gap-0 md:flex-row md:gap-9 lg:gap-16 2xl:gap-32">
        <Banner />

        <div className="flex w-full max-w-[500px] flex-col gap-6 py-10 last:gap-6 lg:gap-7 2xl:gap-10">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={200}
            height={32}
            className="object-contain object-center"
          />

          <div className="flex flex-col gap-4">
            <h1 className="h1-auth-mobile lg:h1-auth-desktop  mb-6 max-w-[200px] lg:max-w-[250px]">
              Sign Up to Get Started
            </h1>
          </div>

          <Stepper onClick={handleStepperClick} currentStep={currentStep} />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-center flex w-full flex-col gap-3 lg:gap-4"
            >
              {currentStep === "form" ? (
                <SignUpForm form={form} onNextStep={handleNextStep} />
              ) : (
                <UploadVatar form={form} isLoading={isLoading} />
              )}
            </form>
          </Form>

          <div className="flex">
            <div className="flex-1 text-center">
              <span className="regular-text-mobile lg:regular-text-desktop">
                Already have an account?{" "}
              </span>
              <Link
                href="/auth/sign-in"
                className="button-cta-mobile lg:button-cta-desktop"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
