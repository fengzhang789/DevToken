/*
  Warnings:

  - You are about to drop the column `claimedAt` on the `Contribution` table. All the data in the column will be lost.
  - You are about to drop the column `github_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `metamask_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Contribution` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[githubId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[metamaskAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `claimAmount` to the `Contribution` table without a default value. This is not possible if the table is not empty.
  - Added the required column `githubId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metamaskAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contribution" DROP COLUMN "claimedAt",
ADD COLUMN     "claimAmount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "github_id",
DROP COLUMN "metamask_id",
ADD COLUMN     "githubId" INTEGER NOT NULL,
ADD COLUMN     "metamaskAddress" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contribution_userId_key" ON "Contribution"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_metamaskAddress_key" ON "User"("metamaskAddress");
