import MembershipsPage from "@/components/Membership";
import Layout from "@/components/layout";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Membership = async () => {
  const session = await auth();

  if (!session?.user && !session) {
    redirect("/");
  }
  return (
    <div>
      <Layout>
        <MembershipsPage />
      </Layout>
    </div>
  );
};

export default Membership;
