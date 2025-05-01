import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBetDB } from './actions';

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
