import errorMessages from "../exceptions/authRepositoryErrorMessages/authRepositoryErrorMessages";
import { errorResponse } from "../models/errorResponse";
export function authRepoErrorHandler(error: unknown): errorResponse {
    if (error instanceof Error) {
      // Check for Firebase Authentication error codes
      const errorCode = (error as any).code;
      return errorMessages[errorCode] || {
        status: 500,
        message: `An unexpected error occurred: ${error.message}`,
      };
    } else {
      return {
        status: 500,
        message: 'An unexpected error occurred.',
      };
    }
  }