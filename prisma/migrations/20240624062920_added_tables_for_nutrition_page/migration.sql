-- CreateTable
CREATE TABLE "NutritionPlan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NutritionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "nutritionPlanId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NutritionPlan" ADD CONSTRAINT "NutritionPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_nutritionPlanId_fkey" FOREIGN KEY ("nutritionPlanId") REFERENCES "NutritionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
