"use client";

import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AdminLoginSchema } from "@/lib/validations";

import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

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
          description: "Please check your email and password",
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

  return (
    <main className="flex h-screen w-full items-center justify-center bg-[#F1F4FA] px-20 py-10">
      <section className="flex size-full max-w-screen-2xl flex-col">
        <div className="mb-auto flex items-center">
          <Image
            src="/assets/images/logo-text.svg"
            width={160}
            height={48}
            alt="logo"
            className="object-contain"
          />
        </div>

        <div className="flex-center flex w-full flex-1">
          <div className="h-auto w-1/3 rounded-2xl bg-white px-10 py-12">
            <h1 className="text-center font-poppins text-4xl font-bold leading-10 text-primary">
              Sign In
            </h1>
            <p className="mt-5 text-center font-lexend text-base font-normal leading-none text-accent-gray">
              Welcome back to Mechaku Admin.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Type your email or username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Type your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="rounded-xl bg-primary text-white"
                  type="submit"
                  disabled={isLoading}
                >
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
