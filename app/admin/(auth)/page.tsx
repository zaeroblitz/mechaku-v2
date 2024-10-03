"use client";

// Modules
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

// Icons
import { LogIn, Mail } from "lucide-react";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AdminLoginSchema } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

// Custom Components
import TextInput from "@/components/shared/form/TextInput";
import Password from "@/components/shared/form/Password";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const { status } = useSession();

  const form = useForm<z.infer<typeof AdminLoginSchema>>({
    resolver: zodResolver(AdminLoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof AdminLoginSchema>) {
    try {
      setIsLoading(true);
      const user = await signIn("admin-login", {
        identifier: values.identifier,
        password: values.password,
        callbackUrl: searchParams.get("callbackUrl") || "/admin/dashboard",
        redirect: false,
      });

      if (!user?.error) {
        router.push(user?.url || "/admin/dashboard");
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
        description: "There was a problem when sign in.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [status, router]);

  return (
    <main className="flex h-screen w-full items-center justify-center bg-[#F1F4FA] px-8 py-4 md:px-12 md:py-8 lg:px-20 lg:py-10">
      <section className="flex size-full max-w-screen-2xl flex-col">
        <div className="mb-auto flex items-center">
          <Image
            src="/assets/images/logo-text.svg"
            width={160}
            height={48}
            alt="logo"
            className="size-auto object-contain"
            priority
          />
        </div>

        <div className="flex-center flex w-full flex-1">
          <div className="h-auto w-full rounded-2xl bg-white px-10 py-12 lg:w-2/3 2xl:w-1/3">
            <h1 className="text-center font-poppins text-3xl font-bold leading-10 text-primary lg:text-4xl">
              Sign In
            </h1>
            <p className="mt-5 text-center font-lexend text-base font-normal leading-none text-accent-gray">
              Welcome to Mechaku Admin.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 flex flex-col gap-4"
              >
                <TextInput
                  control={form.control}
                  name="identifier"
                  label="Email or Username"
                  placeholder="johndoe@email.com"
                  icon={<Mail size={14} />}
                  required
                />
                <Password
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="*********"
                  required
                />
                <Button
                  className="flex items-center gap-2 rounded-2xl bg-primary py-6 font-semibold text-white"
                  type="submit"
                  disabled={isLoading}
                >
                  <span>
                    <LogIn size={14} />
                  </span>
                  {isLoading ? "Loading..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
