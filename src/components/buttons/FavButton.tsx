import { IconButton } from '@chakra-ui/react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useState } from 'react';

import STORAGE_KEYS from '../../data/storageKeys';
import STRINGS from '../../data/strings';
import useShowToast from '../../hooks/useShowToast';
import { CalculatorType } from '../../types/calculatorTypes';
import AppTooltip from '../other/AppTooltip';

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

type FavButtonProps = {
  calculatorId: CalculatorType['id'];
};

const FavButton = ({ calculatorId }: FavButtonProps) => {
  const showToast = useShowToast();

  const [isFav, setIsFav] = useState<boolean>(() =>
    getFavoritesFromLocalStorage().includes(calculatorId),
  );

  const label = isFav
    ? STRINGS.BUTTONS.FAVORITES.ACTION.REMOVE
    : STRINGS.BUTTONS.FAVORITES.ACTION.ADD;

  const toggleFav = () => {
    setIsFav((prev) => {
      const newIsFav = !prev;
      const favorites = getFavoritesFromLocalStorage();
      let newFavorites: number[];

      if (newIsFav) {
        newFavorites = [...favorites, calculatorId].sort((a, b) => a - b);
        showToast(STRINGS.TOASTS.FAVORITES.ADDED, 'success');
      } else {
        newFavorites = favorites.filter((favId) => favId !== calculatorId);
        showToast(STRINGS.TOASTS.FAVORITES.REMOVED, 'warning');
      }

      saveFavoritesToLocalStorage(newFavorites);

      return newIsFav;
    });
  };

  return (
    <AppTooltip label={label}>
      <IconButton
        aria-label={label}
        variant="outline"
        colorScheme={isFav ? 'red' : 'teal'}
        icon={
          isFav ? <IconHeartFilled stroke={1.5} /> : <IconHeart stroke={1.5} />
        }
        onClick={toggleFav}
      />
    </AppTooltip>
  );
};

export default FavButton;
