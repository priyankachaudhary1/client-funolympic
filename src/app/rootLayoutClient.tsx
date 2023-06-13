"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import QueryProvider from "./queryProvider";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer newestOnTop={true} hideProgressBar={true} />
    </>
  );
};

export default RootLayoutClient;
