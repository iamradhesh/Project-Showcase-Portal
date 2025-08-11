// app/providers.js
"use client";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <Header />
      {children}
    </SessionProvider>
  );
}