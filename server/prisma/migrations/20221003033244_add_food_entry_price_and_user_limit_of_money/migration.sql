-- AlterTable
ALTER TABLE "FoodEntry" ADD COLUMN     "price" DOUBLE PRECISION DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "monthlyThresholdLimitOfMoney" INTEGER NOT NULL DEFAULT 1000;
