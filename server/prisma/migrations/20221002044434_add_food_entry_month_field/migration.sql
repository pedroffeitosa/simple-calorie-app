/*
  Warnings:

  - Added the required column `month` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodEntry" ADD COLUMN     "month" TEXT NOT NULL;
