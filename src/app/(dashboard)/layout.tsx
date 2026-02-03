"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "@/components/Layout/Navbar";
import Sidebar from "@/components/Layout/Sidebar";
import { AppDispatch } from "@/store";
import { getProfile } from "@/slices/Auth";

export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}