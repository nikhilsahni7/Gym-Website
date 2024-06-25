import WorkoutsPage from "@/components/Workouts";
import Layout from "@/components/layout";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const WorkoutPage = async () => {
  const session = await auth();

  if (!session?.user && !session) {
    redirect("/");
  }
  return (
    <Layout>
      <WorkoutsPage />
    </Layout>
  );
};

export default WorkoutPage;
