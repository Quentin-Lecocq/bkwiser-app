'use client';

import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { useBets } from '../hooks';

type BetListProps = {
  id: string;
};

const BetList: FC<BetListProps> = ({ id }) => {
  const pathname = usePathname();
  const { data: bets = [], isLoading } = useBets(id);

  console.log({ bets });
  if (isLoading) return <p className="text-sm text-gray-400">Chargement...</p>;
  if (!bets.length)
    return <p className="text-sm text-gray-400">Aucun pari trouvé.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Mes Paris</h2>
      <ul className="space-y-2">
        {bets.map((bet) => {
          const cumulativeOdds =
            bet.legs?.reduce((acc, leg) => acc * leg.odds, 1) ?? 1;

          return (
            <li
              key={bet.id}
              className="border rounded-md p-4 shadow-sm hover:shadow transition"
            >
              <div className="flex justify-between items-center mb-2 text-primary">
                <span className="text-sm text-primary">
                  {format(new Date(bet.date), 'dd/MM/yyyy')}
                </span>
                <div>
                  <Link href={`${pathname}/${bet.id}`}>
                    <Button>Editer</Button>
                  </Link>
                  <span className="text-xs rounded-full text-primary-foreground bg-gray-100 px-2 py-1">
                    {bet.type.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="text-sm text-primary space-y-1">
                <p>
                  Mise : <strong>{bet.stake} €</strong>
                </p>
                <p>
                  Cote totale : <strong>{cumulativeOdds.toFixed(2)}</strong>
                </p>
                <p>
                  Gain potentiel : <strong>{bet.potentialWin} €</strong>
                </p>
                <p>
                  Sélections : <strong>{bet.legs?.length ?? 0}</strong>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BetList;
