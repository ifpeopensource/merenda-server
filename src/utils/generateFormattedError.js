import { fromZodError } from 'zod-validation-error';

export default function generateFormattedError(zodError) {
  const formattedError = {
    error: {
      message: fromZodError(zodError).message,
      details: zodError,
    },
  };

  return formattedError;
}
