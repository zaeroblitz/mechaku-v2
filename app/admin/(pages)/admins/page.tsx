"use client";

// Modules
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Icons
import {
  Ellipsis,
  LoaderCircleIcon,
  Mail,
  Plus,
  SaveIcon,
  User,
} from "lucide-react";

// Shadncn Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Custom Components
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/admin/Header";
import EmptyState from "@/components/shared/state/EmptyState";
import ErrorState from "@/components/shared/state/ErrorState";
import Password from "@/components/shared/form/Password";
import TextInput from "@/components/shared/form/TextInput";
import SingleSelect from "@/components/shared/form/SingleSelect";

// Schema
import { NewAdminSchema } from "@/lib/validations";

// Query
import { useGetAllRolesQuery } from "@/services/roles";
import {
  useGetAllAdminsQuery,
  useCreateAdminMutation,
} from "@/services/admins";

export default function Page() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { data: roles, isLoading: rolesLoading } = useGetAllRolesQuery();
  const { data: admins, isLoading, isError } = useGetAllAdminsQuery();
  const [createAdmin, { isLoading: createLoading }] = useCreateAdminMutation();

  const form = useForm<z.infer<typeof NewAdminSchema>>({
    resolver: zodResolver(NewAdminSchema),
    defaultValues: {
      username: "",
      email: "",
      roleId: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof NewAdminSchema>) => {
    try {
      const data = {
        username: values.username,
        email: values.email,
        roleId: values.roleId,
        password: values.password,
      };

      await createAdmin(data).unwrap();

      toast({
        title: "Success!",
        description: "New Admin created successfully!",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when creating admin data.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <section className="flex w-full flex-1 flex-col">
        <Header title="Admins" />
        <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
          <div className="mb-10 flex">
            <Button
              onClick={() => setOpen(true)}
              className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-6"
            >
              <Plus size={16} color="white" />
              <p className="text-center font-lexend text-white">
                Add New Admin
              </p>
            </Button>
          </div>

          {isLoading || rolesLoading ? (
            <div className="flex h-[480px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Ellipsis size={32} color="#333333" className="animate-pulse" />
                <p className="text-center font-lexend text-gray-500">
                  Loading...
                </p>
              </div>
            </div>
          ) : isError ? (
            <ErrorState text="There was something went wrong." />
          ) : admins && admins.data.length > 0 ? (
            <div className="rounded-2xl bg-white p-8">
              <DataTable columns={columns} data={admins.data} />
            </div>
          ) : (
            <EmptyState text="No admins data found!" />
          )}
        </main>
      </section>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl bg-white p-10 font-lexend">
          <DialogHeader>
            <DialogTitle>Create New Admin</DialogTitle>
          </DialogHeader>
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
                required
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
                disabled={isLoading}
                className="flex-center mt-4 flex gap-3 rounded-full bg-accent-purple py-6 font-lexend font-semibold text-white hover:bg-primary"
              >
                {createLoading ? (
                  <LoaderCircleIcon
                    size={16}
                    color="white"
                    className="animate-spin"
                  />
                ) : (
                  <SaveIcon size={16} color="white" />
                )}
                {isLoading ? "Creating A New Admin ..." : "Create New Admin"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
