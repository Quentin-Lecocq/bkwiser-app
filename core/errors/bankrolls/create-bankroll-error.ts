export function createBankrollError(message: string): Error {
  const error = new Error(message);
  error.name = 'BankrollCreateError';
  return error;
}
