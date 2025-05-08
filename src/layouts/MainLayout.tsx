import { Toaster } from "@/components/ui/sonner";

import { Outlet } from "react-router-dom";

interface MainLayoutProps {}

export default function MainLayout({}: MainLayoutProps) {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
