/*
  Warnings:

  - You are about to drop the column `userId` on the `Contribution` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[githubId]` on the table `Contribution` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `githubId` to the `Contribution` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Contribution_userId_key";

-- AlterTable
ALTER TABLE "Contribution" DROP COLUMN "userId",
ADD COLUMN     "githubId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "Contribution_githubId_key" ON "Contribution"("githubId");

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_githubId_fkey" FOREIGN KEY ("githubId") REFERENCES "User"("githubId") ON DELETE RESTRICT ON UPDATE CASCADE;
