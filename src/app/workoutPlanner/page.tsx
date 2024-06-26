import WorkoutPlanners from "@/components/WorkoutPanner";
import Layout from "@/components/layout";
import { auth } from "@/lib/auth";
import React from "react";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session?.user && !session) {
    redirect("/");
  }
  return (
    <Layout>
      <WorkoutPlanners />
    </Layout>
  );
};

export default page;
