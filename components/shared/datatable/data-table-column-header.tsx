import React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
} from "lucide-react";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-neutral-100"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 size-4 text-slate-400" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 size-4 text-slate-400" />
            ) : (
              <ChevronsUpDownIcon className="ml-2 size-4 text-slate-400" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="rounded-xl bg-white p-1">
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            className="cursor-pointer hover:bg-neutral-100"
          >
            <ArrowUpIcon className="mr-2 size-3.5 text-form-label" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            className="cursor-pointer hover:bg-neutral-100"
          >
            <ArrowDownIcon className="mr-2 size-3.5 text-form-label" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-neutral-200" />
          <DropdownMenuItem
            onClick={() => column.toggleVisibility(false)}
            className="cursor-pointer hover:bg-neutral-100"
          >
            <EyeOffIcon className="mr-2 size-3.5 text-form-label" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
