"use client";

// Modules
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

// Icons
import { Mail } from "lucide-react";

// Shadcn Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Custom Components
import TextInput from "@/components/shared/form/TextInput";
import Password from "@/components/shared/form/Password";
import SingleCheckbox from "@/components/shared/form/SingleCheckbox";

// Schema
import { UserSignInSchema } from "@/lib/validations";
import Banner from "@/components/shop/auth/Banner";

export default function Page() {
  const { toast } = useToast();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof UserSignInSchema>>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UserSignInSchema>) {
    try {
      setIsLoading(true);
      const user = await signIn("user-login", {
        email: values.email,
        password: values.password,
        callbackUrl: searchParams.get("callbackUrl") || "/",
        redirect: false,
      });

      if (!user?.error) {
        router.push(user?.url || "/");
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Incorrect email/username or password.",
          className: "rounded-xl bg-pink-50 text-pink-800",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when login.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="flex-center flex h-screen w-full bg-white p-4 md:px-10 md:py-16 lg:py-10">
      <div className="flex-center flex size-full max-w-screen-2xl flex-col gap-0 md:flex-row md:gap-9 lg:gap-16 2xl:gap-32">
        <Banner />

        {/* Form */}
        <div className="flex w-full max-w-[500px] flex-col gap-6 py-10 lg:gap-7 2xl:gap-10">
          {/* Logo */}
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={200}
            height={32}
            className="object-contain object-center"
          />

          {/* Header */}
          <div className="flex flex-col gap-4">
            <h1 className="h1-auth-mobile lg:h1-auth-desktop">Welcome Back</h1>
            <div className="flex items-center gap-2">
              <p className="regular-text-mobile lg:regular-text-desktop">
                New to Mechaku?
              </p>
              <Link
                href="/auth/sign-up"
                className="button-cta-mobile lg:button-cta-desktop"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-3 lg:gap-4"
            >
              {/* Email */}
              <TextInput
                control={form.control}
                name="email"
                label="Email"
                icon={<Mail size={14} />}
                placeholder="Enter your email address"
                required
                className="bg-white py-6"
              />

              {/* Password */}
              <Password
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                required
                className="bg-white py-6"
              />

              {/* Remember Me & Forgot Password */}
              <div className="mt-2 flex items-center justify-between font-inter">
                <SingleCheckbox
                  control={form.control}
                  name="remind"
                  label="Remind me"
                />

                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-secondary underline lg:text-base"
                >
                  Forgot Password
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full rounded-[36px] bg-primary px-4 py-6 font-poppins text-sm font-bold leading-none text-white lg:text-base"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
