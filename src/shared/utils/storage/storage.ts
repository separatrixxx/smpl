export const saveToStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
    }
};

export const removeFromStorage = (key: string) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key);
    }
};

export const getFromStorage = (key: string): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(key);
    }
    
    return null;
};