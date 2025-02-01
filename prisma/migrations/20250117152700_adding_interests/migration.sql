/*
  Warnings:

  - You are about to drop the column `MScr` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Tasks` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "MScr",
DROP COLUMN "Tasks",
ADD COLUMN     "interests" TEXT[],
ADD COLUMN     "mScr" INTEGER[],
ADD COLUMN     "tasks" TEXT[];
