import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBetDB, getBetsDB } from './actions';

export function useCreateBet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBetDB,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bets'],
      });
    },
  });
}

export function useBets(bankrollId: string) {
  return useQuery({
    queryKey: ['bets', bankrollId],
    queryFn: () => getBetsDB(bankrollId),
  });
}

export function useUpdateBet() {}
