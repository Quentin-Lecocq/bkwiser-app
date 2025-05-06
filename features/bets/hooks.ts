import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBetDB, getBetDB, getBetsDB, updateBetDB } from './actions';

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

export function useUpdateBet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBetDB,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bets'],
      });
    },
    onError: (error) => {
      console.error('Error updating bet:', error);
    },
  });
}

export function useBet(id: string) {
  return useQuery({
    queryKey: ['bet', id],
    queryFn: () => getBetDB(id),
  });
}
