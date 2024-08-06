import errorMessages from "../exceptions/userRepositoryErrorMessages/addUserRepositoryErrorMessages";
import{ errorResponse} from "../models/errorResponse";

export function addUserRepoErrorHandler(error: unknown): errorResponse {
    if (error instanceof Error) {
      // Check for Firestore-specific error codes
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