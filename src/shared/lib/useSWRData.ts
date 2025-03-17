import useSWR from 'swr';
import { handleError } from '../utils/error/handleError';


export const useSWRData = <T>(fetcher: (...args: any[]) => Promise<T>, errorMessage: string, url: string, ...args: any[]) => {
    const { data, error, isLoading } = useSWR<T>(url, () => fetcher(...args), {
        onError: (err) => handleError(err, errorMessage),
        revalidateOnFocus: false,
    });

    return {
        data,
        error,
        isLoading,
    };
};
