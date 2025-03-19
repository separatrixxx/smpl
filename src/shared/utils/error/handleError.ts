import { AxiosError } from 'axios';
import { loggerError } from '../logger/logger';


export const handleError = (error: unknown, errorMessage: string): void => {
    let message = error;
    
    if (error instanceof AxiosError) {
        message = error.response?.data?.message || error.message;
       
    }

    loggerError(`${errorMessage}: ${message}`);
};
