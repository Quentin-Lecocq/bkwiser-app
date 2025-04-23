-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('deposit', 'withdraw');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bankrollId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bankrollId_fkey" FOREIGN KEY ("bankrollId") REFERENCES "Bankroll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
