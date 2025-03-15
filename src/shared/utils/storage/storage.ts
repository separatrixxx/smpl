const storage = localStorage;

export const saveToStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
        storage.setItem(key, value);
    }
};

export const removeFromStorage = (key: string) => {
    if (typeof window !== "undefined") {
        storage.removeItem(key);
    }
};

export const getFromStorage = (key: string): string | null => {
    if (typeof window !== "undefined") {
        return storage.getItem(key);
    }
    
    return null;
};