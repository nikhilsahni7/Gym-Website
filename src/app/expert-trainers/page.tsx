import ExpertTrainersPage from "@/components/Expert-Trainer";
import Layout from "@/components/layout";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session?.user && !session) {
    redirect("/");
  }
  return (
    <div>
      <Layout>
        <ExpertTrainersPage />
      </Layout>
    </div>
  );
};

export default page;
