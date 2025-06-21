import {
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Tooltip,
} from '@chakra-ui/react'
import { IconSortAscendingLetters, IconSortAscendingShapes } from '@tabler/icons-react'
import STRINGS from '../../data/strings'

type SortButtonProps = {
  sortingOrder: string
  setSortingOrder: (value: string) => void
}

export default function SortButton({ sortingOrder, setSortingOrder }: SortButtonProps) {
  return (
    <Menu closeOnSelect={true}>
      <Tooltip label={STRINGS.BUTTONS.SORT.TITLE}>
        <MenuButton
          as={IconButton}
          aria-label={STRINGS.BUTTONS.SORT.TITLE}
          icon={
            sortingOrder === 'alphabetically' ? (
              <IconSortAscendingLetters stroke={1.5} />
            ) : (
              <IconSortAscendingShapes stroke={1.5} />
            )
          }
        />
      </Tooltip>
      <MenuList>
        <MenuOptionGroup
          defaultValue={sortingOrder}
          title={STRINGS.BUTTONS.SORT.TITLE}
          type='radio'>
          <MenuItemOption value='alphabetically' onClick={() => setSortingOrder('alphabetically')}>
            {STRINGS.BUTTONS.SORT.ORDER.ALPHABETICALLY}
          </MenuItemOption>
          <MenuItemOption
            value='by-specialization'
            onClick={() => setSortingOrder('by-specialization')}>
            {STRINGS.BUTTONS.SORT.ORDER.BY_SPECIALIZATION}
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
