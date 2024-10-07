import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps {
  icon: React.ReactNode;
  content: React.ReactNode;
  classname?: string;
}

const TooltipIcon = ({ icon, content, classname }: TooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>{icon}</span>
      </TooltipTrigger>

      <TooltipContent className={`rounded-lg p-2 ${classname}`} side="bottom">
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipIcon;
