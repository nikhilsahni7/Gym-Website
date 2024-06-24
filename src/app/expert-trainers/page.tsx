import AppBar from "@/components/Appbar";
import ExpertTrainersPage from "@/components/Expert-Trainer";
import Layout from "@/components/layout";
import React from "react";

const page = () => {
  return (
    <div>
      <Layout>
        <ExpertTrainersPage />
      </Layout>
    </div>
  );
};

export default page;
