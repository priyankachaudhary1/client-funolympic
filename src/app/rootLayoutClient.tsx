"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import QueryProvider from "./queryProvider";

const RootLayoutClient = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [state, setState] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof window !== "undefined" && !token) {
      router.push("/auth/login");
    }
  }, [router]);

  useEffect(() => {
    setState(true);
  }, []);

  if (!state) {
    return null;
  }

  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  );
};

export default RootLayoutClient;
