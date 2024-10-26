"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ICartItem } from "@/services/carts";

interface CheckoutProviderProps {
  checkoutItems: ICartItem[];
  setCheckoutItems: (items: ICartItem[]) => void;
}

const CheckoutContext = createContext<CheckoutProviderProps | undefined>(
  undefined
);

const STORAGE_KEY = "checkout_items";

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [checkoutItems, setCheckoutItems] = useState<ICartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      return savedItems ? JSON.parse(savedItems) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkoutItems));
  }, [checkoutItems]);

  return (
    <CheckoutContext.Provider value={{ checkoutItems, setCheckoutItems }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);

  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }

  return context;
}
