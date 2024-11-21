import {
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Tooltip,
} from '@chakra-ui/react'
import {
  IconSortAscendingLetters,
  IconSortAscendingShapes,
} from '@tabler/icons-react'

type SortMenuProps = {
  sortingType: string
  setSortingType: (value: string) => void
}

export default function SortButton({
  sortingType,
  setSortingType,
}: SortMenuProps) {
  return (
    <Menu closeOnSelect={true}>
      <Tooltip label='Sortuj'>
        <MenuButton
          as={IconButton}
          aria-label='Sortuj'
          icon={
            sortingType === 'alphabetically' ? (
              <IconSortAscendingLetters stroke={1.5} />
            ) : (
              <IconSortAscendingShapes stroke={1.5} />
            )
          }
        />
      </Tooltip>
      <MenuList minWidth='240px'>
        <MenuOptionGroup defaultValue={sortingType} title='Sortuj' type='radio'>
          <MenuItemOption
            value='alphabetically'
            onClick={() => setSortingType('alphabetically')}>
            Alfabetycznie
          </MenuItemOption>
          <MenuItemOption
            value='bySpecialization'
            onClick={() => setSortingType('bySpecialization')}>
            Po specjalizacji
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
