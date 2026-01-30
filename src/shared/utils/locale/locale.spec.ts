import { describe, it, expect } from 'vitest';
import { getLocale, getLocaleText } from './locale';
import { en } from '@/shared/locales/en.locale';
import { ru } from '@/shared/locales/ru.locale';


describe('getLocale', () => {
    it('returns en as default', () => {
        expect(getLocale(undefined)).toEqual(en);
        expect(getLocale('en')).toEqual(en);
        expect(getLocale('')).toEqual(en);
        expect(getLocale('fr')).toEqual(en);
    });

    it('returns ru when locale is "ru"', () => {
        expect(getLocale('ru')).toEqual(ru);
    });
});

describe('getLocaleText', () => {
    it('returns correct string', () => {
        expect(getLocaleText('en', 'guest')).toBe('guest');
        expect(getLocaleText('ru', 'guest')).toBe('гость');
    });

    it('returns undefined for a missing key', () => {
        expect(getLocaleText('en', 'nonexistent')).toBeUndefined();
        expect(getLocaleText('ru', 'nonexistent')).toBeUndefined();
    });
});
