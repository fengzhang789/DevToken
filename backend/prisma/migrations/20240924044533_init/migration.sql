-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "github_id" TEXT NOT NULL,
    "metamask_id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "repoId" TEXT NOT NULL,
    "commitCount" INTEGER NOT NULL,
    "claimedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);
