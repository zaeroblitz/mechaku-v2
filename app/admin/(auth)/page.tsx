"use client";

import React from "react";
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

const Page = () => {
  const form = useForm<z.infer<typeof AdminLoginSchema>>({
    resolver: zodResolver(AdminLoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof AdminLoginSchema>) {
    console.log(values);
  }

  return (
    <main className="flex h-screen w-full items-center justify-center bg-[#f1f4fa] px-20 py-10">
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
            <h1 className="text-center font-poppins text-4xl font-bold leading-10 text-[#170645]">
              Sign In
            </h1>
            <p className="mt-5 text-center font-lexend text-base font-normal leading-none text-[#858585]">
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
                  className="rounded-xl bg-[#170645] text-white"
                  type="submit"
                >
                  Submit
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
