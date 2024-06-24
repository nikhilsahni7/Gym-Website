import React from "react";
import AppBar from "./Appbar";
import Footer from "./Footer";
import { Toaster } from "./ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />
      <main className="flex-grow pt-16">{children}</main>

      <Footer />
      <Toaster />
    </div>
  );
};
export default Layout;
