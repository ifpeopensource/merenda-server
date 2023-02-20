import { fromZodError } from 'zod-validation-error';

export default function generateFormattedError(zodError) {
  return {
    error: {
      message: fromZodError(zodError).message,
      details: zodError,
    },
  };
}
