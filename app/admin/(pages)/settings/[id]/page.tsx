"use client";

// Modules
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Icons
import { LoaderCircleIcon, Mail, SaveIcon, User } from "lucide-react";

// Components
import Header from "@/components/admin/Header";
import TextInput from "@/components/shared/form/TextInput";
import SingleSelect from "@/components/shared/form/SingleSelect";
import Password from "@/components/shared/form/Password";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Query
import { useGetAllRolesQuery } from "@/services/roles";
import {
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
} from "@/services/admins";

// Utils
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { UpdateAdminSchema } from "@/lib/validations";
import { Skeleton } from "@/components/ui/skeleton";

const defaultValues = {
  username: "",
  email: "",
  roleId: "",
  password: "",
};

export default function Page(params: Params) {
  const { toast } = useToast();

  const { data: roles, isLoading: rolesLoading } = useGetAllRolesQuery();
  const { data, isLoading } = useGetAdminByIdQuery(params.params.id);
  const [updateAdmin, { isLoading: updateLoading }] = useUpdateAdminMutation();

  const form = useForm<z.infer<typeof UpdateAdminSchema>>({
    resolver: zodResolver(UpdateAdminSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof UpdateAdminSchema>) => {
    try {
      const data = {
        id: params.params.id,
        username: values.username,
        email: values.email,
        roleId: values.roleId,
        password: values.password,
      };

      await updateAdmin(data).unwrap();

      toast({
        title: "Success!",
        description: "Admin data updated successfully!",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when updating admin data.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    }
  };

  useEffect(() => {
    if (data) {
      form.reset({
        username: data.data.username,
        email: data.data.email,
        roleId: data.data.roleId,
      });
    }
  }, [data, form]);

  return (
    <>
      <section className="flex w-full flex-1 flex-col">
        <Header title="Settings" />
        <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
          {isLoading || rolesLoading ? (
            <Skeleton className="size-full rounded-2xl bg-slate-200 md:w-3/4 lg:w-2/3 lg:p-12 2xl:w-1/2" />
          ) : (
            <div className="mb-10 flex w-full rounded-2xl bg-white p-8 md:w-3/4 lg:w-2/3 lg:p-12 2xl:w-1/2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex w-full flex-col gap-5"
                >
                  <TextInput
                    control={form.control}
                    name="username"
                    label="Username"
                    placeholder="john_doe"
                    icon={<User size={14} />}
                    required
                  />

                  <TextInput
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="johndoe@email.com"
                    icon={<Mail size={14} />}
                    required
                  />

                  <Password
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="*********"
                    required={false}
                  />

                  {roles && roles.data.length > 0 && (
                    <SingleSelect
                      control={form.control}
                      name="roleId"
                      label="Role"
                      placeholder="Select a role"
                      options={roles.data.map((role) => ({
                        label: role.name,
                        value: role.id,
                      }))}
                      required
                    />
                  )}

                  <Button
                    type="submit"
                    disabled={updateLoading}
                    className="flex-center mt-4 flex gap-3 rounded-full bg-accent-purple py-6 font-lexend font-semibold text-white hover:bg-primary"
                  >
                    {updateLoading ? (
                      <LoaderCircleIcon
                        size={16}
                        color="white"
                        className="animate-spin"
                      />
                    ) : (
                      <SaveIcon size={16} color="white" />
                    )}
                    {updateLoading ? "Updating admin data..." : "Update"}
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </main>
      </section>
    </>
  );
}
