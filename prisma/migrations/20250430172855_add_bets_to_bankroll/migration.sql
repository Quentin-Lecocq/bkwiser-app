-- CreateTable
CREATE TABLE "Bet" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "stake" DOUBLE PRECISION NOT NULL,
    "potentialWin" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bankrollId" TEXT NOT NULL,
    "legs" JSONB NOT NULL,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_bankrollId_fkey" FOREIGN KEY ("bankrollId") REFERENCES "Bankroll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
