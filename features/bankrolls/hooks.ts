import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBankrollDB, getBankrollByIdDB, getBankrollsDB } from './actions';

export function useBankrolls() {
  return useQuery({
    queryKey: ['bankrolls'],
    queryFn: getBankrollsDB,
  });
}

export function useBankroll(id: string) {
  return useQuery({
    queryKey: ['bankroll', id],
    queryFn: () => getBankrollByIdDB(id),
  });
}

export function useCreateBankroll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBankrollDB,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bankrolls'],
      });
    },
  });
}
