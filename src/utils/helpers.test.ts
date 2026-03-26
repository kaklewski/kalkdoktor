import { describe, expect, it } from 'vitest';

import { formatDate, sumValues } from './helpers';

describe('formatDate', () => {
    it('formats date to DD.MM.YYYY', () => {
        const date = new Date('2024-01-01');
        expect(formatDate(date)).toBe('01.01.2024');
    });
});

describe('sumValues', () => {
    it('adds object values 1 + 2 to equal 3', () => {
        const testObj = {
            key1: '1',
            key2: '2',
        };

        expect(sumValues(testObj)).toBe(3);
    });

    it('adds object values -1 + 2 to equal 1', () => {
        const testObj = {
            key1: '-1',
            key2: '2',
        };

        expect(sumValues(testObj)).toBe(1);
    });

    it('returns 0 when the object is empty', () => {
        const testObj = {};

        expect(sumValues(testObj)).toBe(0);
    });

    it('returns 0 when object values are strings', () => {
        const testObj = { key1: 'hello1', key2: 'hello2' };

        expect(sumValues(testObj)).toBe(0);
    });
});
