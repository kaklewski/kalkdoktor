import { useState } from 'react';

import STORAGE_KEYS from '../data/storageKeys';

const getFavoritesFromLocalStorage = (): number[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavoritesToLocalStorage = (favorites: number[]) => {
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
};

const useFavorites = (calculatorId: number) => {
  const [isFavorite, setIsFavorite] = useState(() =>
    getFavoritesFromLocalStorage().includes(calculatorId),
  );

  const toggleFavorite = () => {
    const favorites = getFavoritesFromLocalStorage();
    let newFavorites: number[];
    let newIsFav: boolean;

    if (favorites.includes(calculatorId)) {
      newFavorites = favorites.filter((id) => id !== calculatorId);
      newIsFav = false;
    } else {
      newFavorites = [...favorites, calculatorId].sort((a, b) => a - b);
      newIsFav = true;
    }

    saveFavoritesToLocalStorage(newFavorites);
    setIsFavorite(newIsFav);
  };

  return { isFavorite, toggleFavorite };
};

export default useFavorites;
