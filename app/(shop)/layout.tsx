import React from "react";
import { CheckoutProvider } from "@/context/CheckoutProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}
