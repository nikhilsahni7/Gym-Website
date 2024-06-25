import EquipmentPage from "@/components/Equipment";
import Layout from "@/components/layout";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Equipment = async () => {
  const session = await auth();

  if (!session?.user && !session) {
    redirect("/");
  }
  return (
    <Layout>
      <EquipmentPage />
    </Layout>
  );
};

export default Equipment;
