import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import STORAGE_KEYS from '../data/storageKeys';
import useFavorites from './useFavorites';

describe('useFavorites', () => {
  const STORAGE_KEY = STORAGE_KEYS.FAVORITES;

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('initializes isFavorite as true if ID exists in localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([1, 2, 3]));

    const { result } = renderHook(() => useFavorites(2));

    expect(result.current.isFavorite).toBe(true);
  });

  it('initializes isFavorites as false if ID does not exist', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([1, 2, 3]));

    const { result } = renderHook(() => useFavorites(4));

    expect(result.current.isFavorite).toBe(false);
  });

  it('adds ID to favorites when toggled and not present', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([1, 3]));

    const { result } = renderHook(() => useFavorites(2));

    act(() => {
      result.current.toggleFavorite();
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) as string);

    expect(stored).toEqual([1, 2, 3]); // sorted
    expect(result.current.isFavorite).toBe(true);
  });

  it('removes ID from favorites when toggled an present', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([1, 2, 3]));

    const { result } = renderHook(() => useFavorites(2));

    act(() => {
      result.current.toggleFavorite();
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) as string);

    expect(stored).toEqual([1, 3]);
    expect(result.current.isFavorite).toBe(false);
  });

  it('returns empty array if localStorage contains invalid JSON', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('invalid-json');

    const { result } = renderHook(() => useFavorites(1));

    expect(result.current.isFavorite).toBe(false);
  });
});
