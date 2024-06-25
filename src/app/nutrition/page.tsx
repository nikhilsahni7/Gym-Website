import NutritionPage from "@/components/Nutrition";
import Layout from "@/components/layout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NutritionPlansPage() {
  const session = await auth();

  if (!session?.user && !session) {
    redirect("/");
  }
  return (
    <Layout>
      <NutritionPage />
    </Layout>
  );
}
