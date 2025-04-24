import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTransactionDB, getTransactionsDB } from './actions';

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransactionDB,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });
    },
  });
}

export function useTransactions(bankrollId: string) {
  return useQuery({
    queryKey: ['transactions', bankrollId],
    queryFn: () => getTransactionsDB(bankrollId),
  });
}
