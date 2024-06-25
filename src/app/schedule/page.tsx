import SchedulePage from "@/components/Schedule";
import Layout from "@/components/layout";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Schedule = async () => {
  const session = await auth();

  if (!session?.user && !session) {
    redirect("/");
  }
  return (
    <Layout>
      <SchedulePage />
    </Layout>
  );
};

export default Schedule;
