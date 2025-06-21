import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react'
import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import setThemeAttribute from '../../utils/setThemeAttribute'
import STRINGS from '../../data/strings'

export default function ThemeButton() {
  const { colorMode, setColorMode } = useColorMode()
  const [isAutoTheme, setIsAutoTheme] = useState<boolean>(() => {
    if (localStorage.getItem('auto-color-mode') === 'false') {
      return false
    }
    return true
  })

  // Set up the theme before React loads the Virtual-DOM to remove the flashing effect.
  useEffect(() => {
    setThemeAttribute()
  }, [colorMode])

  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')

  useEffect(() => {
    localStorage.setItem('auto-color-mode', `${isAutoTheme}`)

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

  return (
    <>
      {/* Auto theme is active */}
      {isAutoTheme && (
        <Tooltip label={STRINGS.BUTTONS.CHANGE_THEME.LIGHT} placement='bottom-start'>
          <IconButton
            aria-label={STRINGS.BUTTONS.CHANGE_THEME.LIGHT}
            onClick={() => {
              setIsAutoTheme(false)
              setColorMode('light')
            }}>
            <IconSunMoon stroke={1.5} />
          </IconButton>
        </Tooltip>
      )}

      {/* Light theme is active */}
      {!isAutoTheme && colorMode === 'light' && (
        <Tooltip label={STRINGS.BUTTONS.CHANGE_THEME.DARK} placement='bottom-start'>
          <IconButton
            aria-label={STRINGS.BUTTONS.CHANGE_THEME.DARK}
            onClick={() => {
              setIsAutoTheme(false)
              setColorMode('dark')
            }}>
            <IconSun stroke={1.5} />
          </IconButton>
        </Tooltip>
      )}

      {/* Dark theme is active */}
      {!isAutoTheme && colorMode === 'dark' && (
        <Tooltip label={STRINGS.BUTTONS.CHANGE_THEME.AUTO} placement='bottom-start'>
          <IconButton
            aria-label={STRINGS.BUTTONS.CHANGE_THEME.AUTO}
            onClick={() => {
              setIsAutoTheme(true)
              setColorMode('system')
            }}>
            <IconMoon stroke={1.5} />
          </IconButton>
        </Tooltip>
      )}
    </>
  )
}
