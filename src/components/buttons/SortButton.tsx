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

type SortMenuProps = {
  sortingOrder: string
  setSortingOrder: (value: string) => void
}

export default function SortButton({ sortingOrder, setSortingOrder }: SortMenuProps) {
  return (
    <Menu closeOnSelect={true}>
      <Tooltip label='Zmień sposób sortowania'>
        <MenuButton
          as={IconButton}
          aria-label='Sortuj'
          icon={
            sortingOrder === 'alphabetically' ? (
              <IconSortAscendingLetters stroke={1.5} />
            ) : (
              <IconSortAscendingShapes stroke={1.5} />
            )
          }
        />
      </Tooltip>
      <MenuList minWidth='240px'>
        <MenuOptionGroup defaultValue={sortingOrder} title='Sortuj' type='radio'>
          <MenuItemOption value='alphabetically' onClick={() => setSortingOrder('alphabetically')}>
            Alfabetycznie
          </MenuItemOption>
          <MenuItemOption
            value='by-specialization'
            onClick={() => setSortingOrder('by-specialization')}>
            Po specjalizacji
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
