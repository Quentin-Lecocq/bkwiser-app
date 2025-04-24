export function getAllTransactionsError(message: string): Error {
  const error = new Error(message);
  error.name = 'getAllTransactionsError';
  return error;
}
