"use client";

// Modules
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Icons
import { LockIcon, SaveIcon } from "lucide-react";

// Components
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
import Password from "@/components/shared/form/Password";

// Utils
import { UpdateUserPasswordSchema } from "@/lib/validations";
import { useUpdatePasswordMutation } from "@/services/user";

interface Props {
  id: string;
}

export default function UpdatePassword({ id }: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const form = useForm<z.infer<typeof UpdateUserPasswordSchema>>({
    resolver: zodResolver(UpdateUserPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateUserPasswordSchema>) => {
    try {
      await updatePassword({
        id,
        password: data.password,
      }).unwrap();

      toast({
        title: "Success Update Password!",
        description: "You have successfully updated your password.",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        title: "Update Password Failed!",
        description:
          "There was an error updating your password. Please try again later.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex items-center gap-2 rounded-xl bg-sky-100 px-6 py-3 font-lexend text-xs text-sky-500 transition duration-300 hover:bg-sky-500 hover:text-sky-100 lg:text-sm">
          <LockIcon size={12} /> Update Password
        </div>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="rounded-2xl bg-white p-8"
      >
        <DialogHeader>
          <DialogTitle>Update Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-center flex w-full flex-col gap-3 lg:gap-4"
          >
            <Password
              control={form.control}
              name="password"
              label="Password"
              placeholder="*********"
            />

            <Password
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="*********"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="flex w-full gap-2 rounded-2xl bg-sky-500 text-center font-lexend font-semibold text-white transition duration-300 hover:bg-sky-600"
            >
              {isLoading ? (
                "Updating..."
              ) : (
                <>
                  <SaveIcon size={14} /> Update Password
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
