import { describe, expect, it } from 'vitest';

import { sumValues } from './helpers';

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
