-- CreateTable
CREATE TABLE "Bankroll" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "initialAmount" INTEGER NOT NULL,
    "currentAmount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "Bankroll_pkey" PRIMARY KEY ("id")
);
