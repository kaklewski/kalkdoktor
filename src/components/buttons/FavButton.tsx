import { IconButton } from '@chakra-ui/react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { MouseEvent } from 'react';

import STRINGS from '../../data/strings';
import useFavorites from '../../hooks/useFavorites';
import useShowToast from '../../hooks/useShowToast';
import { CalculatorType } from '../../types/calculatorTypes';
import AppTooltip from '../other/AppTooltip';

type FavButtonProps = {
  calculatorId: CalculatorType['id'];
};

const FavButton = ({ calculatorId }: FavButtonProps) => {
  const showToast = useShowToast();
  const { isFavorite, toggleFavorite } = useFavorites(calculatorId);

  const label = isFavorite
    ? STRINGS.BUTTONS.FAVORITES.ACTION.REMOVE
    : STRINGS.BUTTONS.FAVORITES.ACTION.ADD;

  const icon = isFavorite ? (
    <IconHeartFilled stroke={1.5} />
  ) : (
    <IconHeart stroke={1.5} />
  );

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    toggleFavorite();
    showToast(
      isFavorite
        ? STRINGS.TOASTS.FAVORITES.REMOVED
        : STRINGS.TOASTS.FAVORITES.ADDED,
      isFavorite ? 'warning' : 'success',
    );
  };

  return (
    <AppTooltip label={label}>
      <IconButton
        aria-label={label}
        variant="outline"
        colorScheme={isFavorite ? 'red' : 'teal'}
        icon={icon}
        onClick={handleClick}
      />
    </AppTooltip>
  );
};

export default FavButton;
