import {
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import {
  IconSortAscendingLetters,
  IconSortAscendingShapes,
} from '@tabler/icons-react';

import STORAGE_KEYS from '../../data/storageKeys';
import STRINGS from '../../data/strings';
import AppTooltip from '../other/AppTooltip';

type SortButtonProps = {
  sortingOrder: string;
  setSortingOrder: (value: string) => void;
};

export default function SortButton({
  sortingOrder,
  setSortingOrder,
}: SortButtonProps) {
  return (
    <Menu closeOnSelect={true}>
      <AppTooltip label={STRINGS.BUTTONS.SORT.TITLE}>
        <MenuButton
          as={IconButton}
          aria-label={STRINGS.BUTTONS.SORT.TITLE}
          icon={
            sortingOrder === STORAGE_KEYS.SORT.ALPHABETICALLY ? (
              <IconSortAscendingLetters stroke={1.5} />
            ) : (
              <IconSortAscendingShapes stroke={1.5} />
            )
          }
        />
      </AppTooltip>
      <MenuList>
        <MenuOptionGroup
          defaultValue={sortingOrder}
          title={STRINGS.BUTTONS.SORT.TITLE}
          type="radio"
        >
          <MenuItemOption
            value={STORAGE_KEYS.SORT.ALPHABETICALLY}
            onClick={() => setSortingOrder(STORAGE_KEYS.SORT.ALPHABETICALLY)}
          >
            {STRINGS.BUTTONS.SORT.ORDER.ALPHABETICALLY}
          </MenuItemOption>
          <MenuItemOption
            value={STORAGE_KEYS.SORT.BY_SPECIALIZATION}
            onClick={() => setSortingOrder(STORAGE_KEYS.SORT.BY_SPECIALIZATION)}
          >
            {STRINGS.BUTTONS.SORT.ORDER.BY_SPECIALIZATION}
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
