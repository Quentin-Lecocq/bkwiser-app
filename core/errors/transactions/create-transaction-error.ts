export function createTransactionError(message: string): Error {
  const error = new Error(message);
  error.name = 'TransactionCreateError';
  return error;
}
