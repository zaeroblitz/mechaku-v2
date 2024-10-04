// Modules
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";

// Icons
import { Mail, User } from "lucide-react";

// Components
import { Button } from "@/components/ui/button";
import TextInput from "@/components/shared/form/TextInput";
import NumberInput from "@/components/shared/form/NumberInput";
import Password from "@/components/shared/form/Password";

// Schema
import { UserSignUpSchema } from "@/lib/validations";

type SignUpFormData = z.infer<typeof UserSignUpSchema>;

interface SignUpFormProps {
  form: ReturnType<typeof useForm<SignUpFormData>>;
  onNextStep: () => void;
}

export default function SignUpForm({ form, onNextStep }: SignUpFormProps) {
  return (
    <>
      {/* Name */}
      <TextInput
        control={form.control}
        name="name"
        label="Full Name"
        icon={<User size={14} />}
        placeholder="John Doe"
        required
        className="bg-white py-6"
      />

      {/* Email */}
      <TextInput
        control={form.control}
        name="email"
        label="Email"
        icon={<Mail size={14} />}
        placeholder="johndoe@example.com"
        required
        className="bg-white py-6"
      />

      {/* Phone Number */}
      <NumberInput
        control={form.control}
        name="phoneNumber"
        label="Phone Number"
        placeholder="8134567890"
        unit="+62"
        unitPosition="left"
      />

      {/* Password */}
      <Password
        control={form.control}
        name="password"
        label="Password"
        placeholder="********"
        required
        className="bg-white py-6"
      />

      {/* Password */}
      <Password
        control={form.control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="********"
        required
        className="bg-white py-6"
      />

      {/* Next Step */}
      <Button
        type="button"
        onClick={onNextStep}
        className="mt-6 w-full rounded-[36px] bg-primary px-4 py-6 font-poppins text-sm font-bold leading-none text-white lg:text-base"
      >
        Next
      </Button>
    </>
  );
}
