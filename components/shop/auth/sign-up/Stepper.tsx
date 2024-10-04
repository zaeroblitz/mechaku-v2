import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: "form" | "avatar";
  onClick: (step: "form" | "avatar") => void;
}

export default function Stepper({ currentStep, onClick }: StepperProps) {
  return (
    <div className="flex w-full select-none justify-center font-lexend">
      <div className="flex items-center gap-4">
        <Button
          onClick={() => onClick("form")}
          className={cn(
            "text-center w-32 text-xs font-medium uppercase text-white rounded-full cursor-pointer",
            currentStep === "form"
              ? "bg-accent-purple text-purple-50 hover:bg-purple-50 hover:text-accent-purple"
              : "bg-neutral-100 text-neutral-400 hover:bg-neutral-400 hover:text-neutral-100"
          )}
        >
          Personal Info
        </Button>

        <Button
          disabled={currentStep === "form"}
          onClick={() => onClick("avatar")}
          className={cn(
            "text-center w-32 text-xs font-medium uppercase text-white rounded-full cursor-pointer",
            currentStep === "avatar"
              ? "bg-accent-purple text-purple-50 hover:bg-purple-50 hover:text-accent-purple"
              : "bg-neutral-100 text-neutral-400 hover:bg-neutral-400 hover:text-neutral-100"
          )}
        >
          Avatar
        </Button>
      </div>
    </div>
  );
}
