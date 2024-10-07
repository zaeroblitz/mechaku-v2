import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

export default function TestDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex-center flex h-12 gap-3 rounded-2xl border border-[#ecedf2] bg-white px-8 font-poppins text-xs font-semibold leading-snug text-secondary hover:bg-slate-50">
          <FilterIcon size={16} /> <p className="">Filter</p>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
