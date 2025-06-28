import {
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react'
import { IconMoon, IconPercentage50, IconSun } from '@tabler/icons-react'
import { useEffect, useLayoutEffect, useState } from 'react'
import setThemeAttribute from '../../utils/setThemeAttribute'
import STRINGS from '../../data/strings'
import STORAGE_KEYS from '../../data/storageKeys'

export default function ThemeButton() {
  const { colorMode, setColorMode } = useColorMode()
  const [isAutoTheme, setIsAutoTheme] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEYS.COLOR_THEME.AUTO) === 'true'
  )

  // Set up the theme before React loads the Virtual-DOM to remove the flashing effect
  useLayoutEffect(() => {
    setThemeAttribute()
  }, [isAutoTheme, colorMode])

  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COLOR_THEME.AUTO, `${isAutoTheme}`)

    if (!isAutoTheme) return

    function changeTheme(event: MediaQueryListEvent) {
      if (event.matches) {
        setColorMode('dark')
      } else {
        setColorMode('light')
      }
    }

    prefersDarkScheme.addEventListener('change', changeTheme)
    return () => prefersDarkScheme.removeEventListener('change', changeTheme)
  }, [isAutoTheme, prefersDarkScheme, setColorMode])

  const currentTheme = isAutoTheme ? 'auto' : colorMode
  const currentThemeIcon = {
    auto: <IconPercentage50 stroke={1.5} />,
    light: <IconSun stroke={1.5} />,
    dark: <IconMoon stroke={1.5} />,
  }

  return (
    <Menu closeOnSelect={true}>
      <Tooltip label={STRINGS.BUTTONS.CHANGE_THEME.TITLE}>
        <MenuButton
          as={IconButton}
          aria-label={STRINGS.BUTTONS.CHANGE_THEME.TITLE}
          icon={currentThemeIcon[currentTheme]}
        />
      </Tooltip>
      <MenuList>
        <MenuOptionGroup
          defaultValue={currentTheme}
          title={STRINGS.BUTTONS.CHANGE_THEME.TITLE}
          type='radio'>
          <MenuItemOption
            value='auto'
            onClick={() => {
              setIsAutoTheme(true)
              setColorMode('system')
            }}>
            {STRINGS.BUTTONS.CHANGE_THEME.AUTO}
          </MenuItemOption>
          <MenuItemOption
            value='light'
            onClick={() => {
              setIsAutoTheme(false)
              setColorMode('light')
            }}>
            {STRINGS.BUTTONS.CHANGE_THEME.LIGHT}
          </MenuItemOption>
          <MenuItemOption
            value='dark'
            onClick={() => {
              setIsAutoTheme(false)
              setColorMode('dark')
            }}>
            {STRINGS.BUTTONS.CHANGE_THEME.DARK}
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
