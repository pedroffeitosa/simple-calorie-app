/*
  Warnings:

  - You are about to drop the column `date` on the `FoodEntry` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodEntry" DROP COLUMN "date",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "day" TEXT NOT NULL;
