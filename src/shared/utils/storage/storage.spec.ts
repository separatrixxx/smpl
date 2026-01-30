import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getFromStorage, removeFromStorage, saveToStorage } from './storage';


describe('localStorage helpers', () => {
    beforeEach(() => {
        const localStorageMock = (() => {
            let store: Record<string, string> = {};
            return {
                getItem: vi.fn((key: string) => store[key] || null),
                setItem: vi.fn((key: string, value: string) => { store[key] = value + ''; }),
                removeItem: vi.fn((key: string) => { delete store[key]; }),
                clear: vi.fn(() => { store = {}; }),
            };
        })();

        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true,
        });
    });

    describe('saveToStorage', () => {
        it('saves value to localStorage', () => {
            saveToStorage('testKey', 'testValue');
            expect(window.localStorage.setItem).toHaveBeenCalledWith('testKey', 'testValue');
            expect(window.localStorage.getItem('testKey')).toBe('testValue');
        });
    });

    describe('getFromStorage', () => {
        it('returns value previously saved with given key', () => {
            window.localStorage.setItem('anotherKey', 'anotherValue');

            expect(getFromStorage('anotherKey')).toBe('anotherValue');
        });

        it('returns null for missing key', () => {
            expect(getFromStorage('unknownKey')).toBeNull();
        });
    });

    describe('removeFromStorage', () => {
        it('removes the value by key', () => {
            window.localStorage.setItem('keyToRemove', 'value');

            removeFromStorage('keyToRemove');
            
            expect(window.localStorage.removeItem).toHaveBeenCalledWith('keyToRemove');
            expect(window.localStorage.getItem('keyToRemove')).toBeNull();
        });
    });
});
