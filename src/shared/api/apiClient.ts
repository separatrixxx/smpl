import axios, { AxiosInstance, AxiosResponse } from 'axios';


const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DOMAIN || '',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getData = async <T>(url: string): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await apiClient.get(url);
        
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const postData = async <T>(url: string, data: unknown): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await apiClient.post(url, data);

        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const putData = async <T>(url: string, data: unknown): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await apiClient.put(url, data);

        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const deleteData = async <T>(url: string): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await apiClient.delete(url);

        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

const handleApiError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message || error.message;
    }

    return 'An unexpected error occurred';
};
