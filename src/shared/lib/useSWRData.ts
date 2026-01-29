import useSWR from 'swr';
import { handleError } from '../utils/error/handleError';


export const useSWRData = <T>(fetcher: (...args: any[]) => Promise<T>, errorMessage: string, url: string | null, ...args: any[]) => {
    const { data, error, isLoading, mutate } = useSWR<T>(url, url ? () => fetcher(...args) : null, {
        onError: (err) => handleError(err, errorMessage),
        revalidateOnFocus: false,
    });

    return {
        data,
        error,
        isLoading,
        mutate,
    };
};
