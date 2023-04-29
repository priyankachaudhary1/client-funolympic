"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import QueryProvider from "./queryProvider";

const RootLayoutClient = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof window !== "undefined" && !token) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  );
};

export default RootLayoutClient;
