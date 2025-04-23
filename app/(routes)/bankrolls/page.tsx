import BankrollList from '@/features/bankrolls/components/bankroll-list';
import Link from 'next/link';
import { FC } from 'react';

const BankrollPage: FC = () => {
  return (
    <>
      <BankrollList />
      <Link href="/bankrolls/new">Create bankroll</Link>
    </>
  );
};

export default BankrollPage;
