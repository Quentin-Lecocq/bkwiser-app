import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBankrollDB, getBankrollsDB } from './actions';

export function useBankrolls() {
  return useQuery({
    queryKey: ['bankrolls'],
    queryFn: getBankrollsDB,
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
