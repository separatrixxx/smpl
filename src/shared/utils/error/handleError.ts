import { AxiosError } from 'axios';


export const handleError = (error: unknown, errorMessage: string): void => {
    let message = error;
    
    if (error instanceof AxiosError) {
        message = error.response?.data?.message || error.message;

        console.error(errorMessage, message);
    }

    console.error(`${errorMessage}:`, message);
};
