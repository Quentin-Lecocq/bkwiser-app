export function getAllBankrollsError(message: string): Error {
  const error = new Error(message);
  error.name = 'getAllBankrollsError';
  return error;
}
