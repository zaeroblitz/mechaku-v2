"use client";

// Modules
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Icons
import { Ellipsis, LoaderCircleIcon, Plus, SaveIcon } from "lucide-react";

// Shadncn Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Custom Components
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/admin/Header";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import TextInput from "@/components/shared/form/TextInput";
import TextArea from "@/components/shared/form/TextArea";
import MultipleCheckbox from "@/components/shared/form/MultipleCheckbox";

// Schema
import { NewRoleSchema } from "@/lib/validations";

// Query
import { useGetAllPermissionsQuery } from "@/services/permissions";
import { useGetAllRolesQuery, useCreateRoleMutation } from "@/services/roles";

export default function Page() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { data: permissions, isLoading: permissionsLoading } =
    useGetAllPermissionsQuery();
  const { data: roles, isLoading, isError } = useGetAllRolesQuery();
  const [createRole, { isLoading: createLoading }] = useCreateRoleMutation();

  const form = useForm<z.infer<typeof NewRoleSchema>>({
    resolver: zodResolver(NewRoleSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof NewRoleSchema>) => {
    try {
      const data = {
        name: values.name,
        description: values.description,
        permissions: values.permissions,
      };

      await createRole(data);

      toast({
        title: "Success!",
        description: "New Role created successfully!",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when creating role data.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <section className="flex w-full flex-1 flex-col">
        <Header title="Roles" />
        <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
          <div className="mb-10 flex">
            <Button
              onClick={() => setOpen(true)}
              className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-6"
            >
              <Plus size={16} color="white" />
              <p className="text-center font-lexend text-white">Add New Role</p>
            </Button>
          </div>

          {isLoading || permissionsLoading ? (
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
          ) : roles && roles.data.length > 0 ? (
            <div className="rounded-2xl bg-white p-8">
              <DataTable columns={columns} data={roles.data} />
            </div>
          ) : (
            <EmptyState text="No roles data found!" />
          )}
        </main>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="rounded-2xl bg-white p-10 font-lexend"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-5"
            >
              <TextInput
                control={form.control}
                name="name"
                label="Name"
                placeholder="Type role name"
                required
              />

              <TextArea
                control={form.control}
                name="description"
                label="Description"
                placeholder="Type role description"
                required
              />

              {permissions && permissions.data.length > 0 && (
                <MultipleCheckbox
                  control={form.control}
                  name="permissions"
                  label="Permissions"
                  options={permissions.data.map((permission) => ({
                    id: permission.id,
                    label: permission.name,
                  }))}
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
                {isLoading ? "Creating A New Role ..." : "Create New Role"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
