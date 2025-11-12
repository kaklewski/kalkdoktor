import { IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import STORAGE_KEYS from '../../data/storageKeys';
import STRINGS from '../../data/strings';
import { CalculatorType } from '../../types/calculatorTypes';

type FavButtonProps = {
  calculatorId: CalculatorType['id'];
};

export default function FavButton({ calculatorId }: FavButtonProps) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (stored) {
      const favorites: number[] = JSON.parse(stored);
      setIsFav(favorites.includes(calculatorId));
    }
  }, [calculatorId]);

  const toast = useToast();

  const TOAST_CONFIG = {
    added: {
      title: STRINGS.TOASTS.FAVORITES.ADDED,
      status: 'success',
    },
    removed: {
      title: STRINGS.TOASTS.FAVORITES.REMOVED,
      status: 'warning',
    },
  } as const;

  function showToast(type: keyof typeof TOAST_CONFIG) {
    const config = TOAST_CONFIG[type];
    toast({
      title: config.title,
      status: config.status,
      position: 'top',
      duration: 1500,
      isClosable: true,
    });
  }

  function toggleFav() {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    let favorites: number[] = stored ? JSON.parse(stored) : [];

    if (favorites.includes(calculatorId)) {
      favorites = favorites.filter((favId) => favId !== calculatorId);
      setIsFav(false);
      showToast('removed');
    } else {
      favorites.push(calculatorId);
      favorites.sort();
      setIsFav(true);
      showToast('added');
    }

    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }

  return (
    <Tooltip
      label={
        isFav
          ? STRINGS.BUTTONS.FAVORITES.ACTION.REMOVE
          : STRINGS.BUTTONS.FAVORITES.ACTION.ADD
      }
    >
      <IconButton
        aria-label={
          isFav
            ? STRINGS.BUTTONS.FAVORITES.ACTION.REMOVE
            : STRINGS.BUTTONS.FAVORITES.ACTION.ADD
        }
        variant="outline"
        colorScheme={isFav ? 'red' : 'teal'}
        icon={
          isFav ? <IconHeartFilled stroke={1.5} /> : <IconHeart stroke={1.5} />
        }
        onClick={toggleFav}
      />
    </Tooltip>
  );
}
