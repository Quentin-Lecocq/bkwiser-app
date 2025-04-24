import { useMutation, useQuery } from '@tanstack/react-query';
import { createTransactionDB, getTransactionsDB } from './actions';

export function useCreateTransaction() {
  return useMutation({
    mutationFn: createTransactionDB,
    onSuccess: () => {
      console.log('success');
    },
  });
}

export function useTransactions(bankrollId: string) {
  return useQuery({
    queryKey: ['transactions', bankrollId],
    queryFn: () => getTransactionsDB(bankrollId),
  });
}
