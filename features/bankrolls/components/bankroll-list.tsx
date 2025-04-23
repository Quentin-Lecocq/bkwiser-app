'use client';

import { Button } from '@/components/ui/button';

import { Bankroll } from '@/core/schemas/bankroll.schema';
import Link from 'next/link';
import { useBankrolls } from '../hooks';

const BankrollList = () => {
  const { data, isLoading, isError } = useBankrolls();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>something went wrong</p>;

  return (
    <div>
      <h1>My bankrolls</h1>
      <ul>
        {data.map(({ id, name, currency, currentAmount }: Bankroll) => (
          <li className="flex items-center gap-4 mb-4" key={id}>
            <span>
              {name} - {currentAmount} {currency}
            </span>
            <Link href={`/bankrolls/${id}`}>
              <Button className="cursor-pointer" variant="link" size="sm">
                edit
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankrollList;
