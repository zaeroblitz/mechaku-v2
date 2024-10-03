"use client";

// Modules
import React, { useState } from "react";
import { Row } from "@tanstack/react-table";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Icons
import {
  Copy,
  LoaderCircleIcon,
  MoreHorizontal,
  Pencil,
  SaveIcon,
  Mail,
  User,
  Settings2,
} from "lucide-react";

// Shadcn Components
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Custom Components
import TextInput from "@/components/shared/form/TextInput";
import SingleSelect from "@/components/shared/form/SingleSelect";
import Password from "@/components/shared/form/Password";

// Query
import { useGetAllRolesQuery } from "@/services/roles";
import {
  IAdmin,
  useUpdateAdminMutation,
  useUpdateAdminStatusMutation,
} from "@/services/admins";

// Schema
import { UpdateAdminSchema } from "@/lib/validations";

interface ActionsCellProps {
  row: Row<IAdmin>;
}

const ActionCell = ({ row }: ActionsCellProps) => {
  const admin = row.original;
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { data: roles, isLoading: rolesLoading } = useGetAllRolesQuery();
  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();
  const [updateAdminStatus] = useUpdateAdminStatusMutation();

  const form = useForm<z.infer<typeof UpdateAdminSchema>>({
    resolver: zodResolver(UpdateAdminSchema),
    defaultValues: {
      username: admin.username,
      email: admin.email,
      roleId: admin.roleId,
    },
  });

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Admin ID copied",
      description: "The admin ID has been copied to your clipboard.",
      className: "bg-white rounded-xl",
    });
  };

  const handleEdit = () => {
    setOpen(true);
  };

  const handleChangeStatus = async () => {
    try {
      toast({
        title: "Updating admin status...",
        description: "Please wait while we update the admin status.",
        className: "rounded-xl bg-white",
      });

      await updateAdminStatus({
        id: admin.id,
        status: !admin.isActive,
      }).unwrap();

      toast({
        title: "Success!",
        description: "Admin status updated successfully!",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when updating admin status.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof UpdateAdminSchema>) => {
    try {
      const data = {
        id: admin.id,
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
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="flex flex-col rounded-xl bg-white p-2 font-inter"
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-200" />
          <DropdownMenuItem
            className="flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-slate-100"
            onClick={() => handleCopyId(admin.id)}
          >
            <Copy size={10} color="#333333" />
            <span>Copy ID</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-slate-100"
            onClick={handleEdit}
          >
            <Pencil size={10} color="#333333" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-slate-100"
            onClick={handleChangeStatus}
          >
            <Settings2 size={10} color="#333333" />
            <span>Set to {admin.isActive ? "Inactive" : "Active"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {!rolesLoading && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="rounded-2xl bg-white p-10 font-lexend"
            aria-describedby={undefined}
          >
            <DialogHeader>
              <DialogTitle>Edit Admin</DialogTitle>
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
                  disabled={isLoading}
                  className="flex-center mt-4 flex gap-3 rounded-full bg-accent-purple py-6 font-lexend font-semibold text-white hover:bg-primary"
                >
                  {isLoading ? (
                    <LoaderCircleIcon
                      size={16}
                      color="white"
                      className="animate-spin"
                    />
                  ) : (
                    <SaveIcon size={16} color="white" />
                  )}
                  {isLoading ? "Updating admin data..." : "Update"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ActionCell;
