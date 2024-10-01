import React from "react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

interface Props {
  handleClick: () => void;
  label?: string;
  icon?: React.ReactNode;
}

export default function ResetButton({
  handleClick,
  label = "Reset",
  icon = <XIcon className="size-4" />,
}: Props) {
  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className="gap-2 rounded-2xl bg-rose-50 px-8 py-4 text-center text-rose-400 transition duration-300 hover:bg-rose-400 hover:text-rose-50"
    >
      {icon}
      {label}
    </Button>
  );
}
