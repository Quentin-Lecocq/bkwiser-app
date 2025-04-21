import { useQuery } from '@tanstack/react-query';
import { getBankrollsDB } from './actions';

export function useBankrolls() {
  return useQuery({
    queryKey: ['bankrolls'],
    queryFn: getBankrollsDB,
  });
}
