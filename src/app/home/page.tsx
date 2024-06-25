import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import Layout from "@/components/layout";

const Home = async () => {
  const session = await auth();

  if (!session?.user && !session) {
    redirect("/");
  }
  return (
    <Layout>
      <Sidebar />
      <HeroSection />
    </Layout>
  );
};

export default Home;
