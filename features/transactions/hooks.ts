import { useMutation } from '@tanstack/react-query';
import { createTransactionDB } from './actions';

export function useCreateTransaction() {
  return useMutation({
    mutationFn: createTransactionDB,
    onSuccess: () => {
      console.log('success');
    },
  });
}
