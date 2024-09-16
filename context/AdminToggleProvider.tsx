"use client";

import React, { createContext, useContext, useState } from "react";

interface AdminToggleContextType {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}

const AdminToggleContext = createContext<AdminToggleContextType | undefined>(
  undefined
);

export function AdminToggleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggle, setToggle] = useState(false);

  return (
    <AdminToggleContext.Provider value={{ toggle, setToggle }}>
      {children}
    </AdminToggleContext.Provider>
  );
}

export function useAdminToggle() {
  const context = useContext(AdminToggleContext);

  if (context === undefined) {
    throw new Error("useAdminToggle must be used within a AdminToggleProvider");
  }

  return context;
}
