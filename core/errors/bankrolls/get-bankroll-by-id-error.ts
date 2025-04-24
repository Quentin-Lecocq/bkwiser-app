export function getBankrollByIdError(message: string): Error {
  const error = new Error(message);
  error.name = 'getBankrollByIdError';
  return error;
}
