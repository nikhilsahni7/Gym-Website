/*
  Warnings:

  - You are about to drop the `Meal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NutritionPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_nutritionPlanId_fkey";

-- DropForeignKey
ALTER TABLE "NutritionPlan" DROP CONSTRAINT "NutritionPlan_userId_fkey";

-- DropTable
DROP TABLE "Meal";

-- DropTable
DROP TABLE "NutritionPlan";

-- CreateTable
CREATE TABLE "consultations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
