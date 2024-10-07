"use client";

import React, { useState, useCallback } from "react";
import { FilterIcon } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import MultiCheckbox from "@/components/shared/utils/MultiCheckbox";
import NumberInput from "@/components/shared/utils/NumberInput";

import { ISeries } from "@/services/series";
import { IBrand } from "@/services/brands";
import { IGrade } from "@/services/grades";

interface FilterValueProps {
  series?: string[];
  brands?: string[];
  grades?: string[];
  minPrice?: number;
  maxPrice?: number;
}

interface Props {
  series?: ISeries[];
  brands?: IBrand[];
  grades?: IGrade[];
  onFilterChange: (filters: FilterValueProps) => void;
}

function Filter({ series, brands, grades, onFilterChange }: Props) {
  const [localFilters, setLocalFilters] = useState<FilterValueProps>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleFilterChange = useCallback(
    (key: keyof FilterValueProps, value: any) => {
      setLocalFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const applyFilters = useCallback(() => {
    onFilterChange(localFilters);
    setIsDrawerOpen(false);
  }, [localFilters, onFilterChange]);

  const filterContent = (
    <>
      <div className="flex flex-row justify-between lg:flex-col lg:justify-normal lg:gap-6">
        <MultiCheckbox
          label="Series"
          limit={10}
          items={series?.map((item) => ({
            label: item.title,
            value: item.id,
          }))}
          onChange={(values) => handleFilterChange("series", values)}
        />
        <MultiCheckbox
          label="Brands"
          limit={10}
          items={brands?.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          onChange={(values) => handleFilterChange("brands", values)}
        />
        <MultiCheckbox
          label="Grades"
          limit={10}
          items={grades?.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          onChange={(values) => handleFilterChange("grades", values)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <NumberInput
          label="Min. Price"
          placeholder="Rp 100.000"
          isPrice
          onChange={(value) => handleFilterChange("minPrice", value)}
        />
        <NumberInput
          label="Max. Price"
          placeholder="Rp 1.000.000"
          isPrice
          onChange={(value) => handleFilterChange("maxPrice", value)}
        />
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Ver. */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <div className="flex-center flex h-12 w-fit gap-3 rounded-2xl border border-[#ecedf2] bg-white px-8 font-poppins text-xs font-semibold leading-snug text-secondary hover:bg-slate-50 lg:hidden">
            <FilterIcon size={16} /> <p>Filter</p>
          </div>
        </DrawerTrigger>
        <DrawerContent className="bg-white">
          <DrawerHeader>
            <DrawerTitle>Filter</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-3 p-6">{filterContent}</div>
          <DrawerFooter className="flex flex-row">
            <DrawerClose asChild>
              <div className="w-full cursor-pointer rounded-xl bg-slate-100 px-6 py-3 text-center font-poppins text-xs font-bold text-slate-500 transition duration-300 hover:bg-slate-200">
                Close
              </div>
            </DrawerClose>
            <div
              onClick={applyFilters}
              className="w-full cursor-pointer rounded-xl bg-accent-purple px-6 py-3 text-center font-poppins text-xs font-bold text-purple-50 transition duration-300 hover:bg-accent-purple/80"
            >
              Apply Filters
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Desktop Ver. */}
      <div className="hidden w-fit flex-col gap-6 rounded-2xl border border-[#ecedf2] bg-white p-8 lg:flex">
        <h5 className="font-poppins text-2xl font-bold text-primary">Filter</h5>
        {filterContent}
        <div
          onClick={applyFilters}
          className="w-full cursor-pointer rounded-xl bg-accent-purple px-6 py-3 text-center font-poppins text-xs font-bold text-purple-50 transition duration-300 hover:bg-accent-purple/80"
        >
          Apply Filters
        </div>
      </div>
    </>
  );
}

export default Filter;
