/*
  Warnings:

  - A unique constraint covering the columns `[repoId]` on the table `Contribution` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `userId` on the `Contribution` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `repoId` on the `Contribution` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Contribution" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "repoId",
ADD COLUMN     "repoId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contribution_userId_key" ON "Contribution"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Contribution_repoId_key" ON "Contribution"("repoId");
