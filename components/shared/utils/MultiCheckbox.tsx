import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface ItemProps {
  label: string;
  value: string;
}

interface Props {
  label: string;
  items?: ItemProps[];
  limit: number;
  onChange: (values: string[]) => void;
}

export default function MultiCheckbox({
  label,
  items,
  limit,
  onChange,
}: Props) {
  const [values, setValues] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? items : items?.slice(0, limit);

  const handleCheckboxChange = (checked: boolean, itemValue: string) => {
    const newValues = checked
      ? [...values, itemValue]
      : values.filter((value) => value !== itemValue);
    setValues(newValues);
    onChange(newValues);
  };

  return (
    <div className="flex flex-col gap-1">
      <p className="font-poppins text-base font-medium leading-loose text-primary underline lg:text-xl">
        {label}
      </p>
      {items && items.length > 0 && (
        <div className="flex flex-col gap-0.5 lg:gap-1">
          {displayedItems?.map((item) => (
            <div key={item.value} className="flex items-center gap-2">
              <Checkbox
                id={item.value}
                checked={values.includes(item.value)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(checked as boolean, item.value)
                }
                className="size-4 rounded-sm border border-slate-200 text-violet-50 data-[state=checked]:bg-accent-purple lg:size-5 lg:rounded-md"
              />
              <label
                htmlFor={item.value}
                className="font-inter text-sm leading-loose text-slate-500 lg:text-base"
              >
                {item.label}
              </label>
            </div>
          ))}
          {items.length > limit && !showAll && (
            <Button
              onClick={() => setShowAll(true)}
              className="m-0 mt-2 size-fit bg-transparent p-0 text-sm text-accent-purple hover:bg-transparent hover:underline"
            >
              See all {label.toLowerCase()}
            </Button>
          )}

          {items.length > limit && showAll && (
            <Button
              onClick={() => setShowAll(false)}
              className="m-0 mt-2 size-fit bg-transparent p-0 text-sm text-accent-purple hover:bg-transparent hover:underline"
            >
              See less {label.toLowerCase()}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
