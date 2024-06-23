import Logout from "@/components/Logout";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";

const Home = async () => {
  const session = await auth();

  if (!session?.user && !session) {
    redirect("/");
  }
  return (
    <div>
      <Sidebar />
      <HeroSection />
    </div>
  );
};

export default Home;
