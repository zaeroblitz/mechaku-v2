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
  Trash,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Custom Components
import TextInput from "@/components/shared/form/TextInput";
import TextArea from "@/components/shared/form/TextArea";

// Query
import {
  IPermission,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} from "@/services/permissions";

// Schema
import { NewPermissionSchema } from "@/lib/validations";

interface ActionsCellProps {
  row: Row<IPermission>;
}

const ActionCell = ({ row }: ActionsCellProps) => {
  const permission = row.original;
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updatePermission, { isLoading }] = useUpdatePermissionMutation();
  const [deletePermission] = useDeletePermissionMutation();

  const form = useForm<z.infer<typeof NewPermissionSchema>>({
    resolver: zodResolver(NewPermissionSchema),
    defaultValues: {
      name: permission.name,
      description: permission.description,
    },
  });

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Permission ID copied",
      description: "The permission ID has been copied to your clipboard.",
      className: "bg-white rounded-xl",
    });
  };

  const handleEdit = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    setDeleteOpen(true);
  };

  const onSubmit = async (values: z.infer<typeof NewPermissionSchema>) => {
    try {
      const data = {
        id: permission.id,
        name: values.name,
        description: values.description,
      };

      await updatePermission(data).unwrap();

      toast({
        title: "Success!",
        description: "Permission data updated successfully!",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when updating permission data.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    } finally {
      setOpen(false);
    }
  };

  const onDelete = async () => {
    try {
      await deletePermission({ id: permission.id }).unwrap();
      toast({
        title: "Success!",
        description: "Permission deleted successfully!",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when deleting permission data.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    } finally {
      setDeleteOpen(false);
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
            onClick={() => handleCopyId(permission.id)}
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
            onClick={handleDelete}
          >
            <Trash size={10} color="#333333" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl bg-white p-10 font-lexend">
          <DialogHeader>
            <DialogTitle>Edit Permission</DialogTitle>
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
                placeholder="Type permission name"
                required
              />

              <TextArea
                control={form.control}
                name="description"
                label="description"
                placeholder="Type permission description"
                required
              />

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
                {isLoading ? "Updating permission data..." : "Update"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="rounded-2xl bg-white p-8 font-lexend">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              permission and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl border-none bg-slate-50 text-slate-500 transition duration-300 hover:bg-slate-500 hover:text-slate-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl bg-rose-50 text-rose-500 transition duration-300 hover:bg-rose-500 hover:text-rose-50 "
              onClick={onDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ActionCell;
