import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react'
import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import setThemeAttribute from '../../utils/setThemeAttribute'

export default function ThemeButton() {
  const [isAutoTheme, setIsAutoTheme] = useState<boolean>(() => {
    if (localStorage.getItem('auto-color-mode') === 'false') return false
    return true
  })
  const { colorMode, setColorMode } = useColorMode()

  // Set up the theme before React loads the Virtual-DOM to remove the flashing effect.
  useEffect(() => {
    setThemeAttribute()
  }, [colorMode])

  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')

  useEffect(() => {
    localStorage.setItem('auto-color-mode', `${isAutoTheme}`)

    if (isAutoTheme === false) return

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
      {isAutoTheme === true && (
        <Tooltip label='Zmień motyw na jasny' placement='bottom-start'>
          <IconButton
            aria-label='Zmień motyw na jasny'
            onClick={() => {
              setIsAutoTheme(false)
              setColorMode('light')
            }}>
            <IconSunMoon stroke={1.5} />
          </IconButton>
        </Tooltip>
      )}

      {/* Light theme is active */}
      {isAutoTheme === false && colorMode === 'light' && (
        <Tooltip label='Zmień motyw na ciemny' placement='bottom-start'>
          <IconButton
            aria-label='Zmień motyw na ciemny'
            onClick={() => {
              setIsAutoTheme(false)
              setColorMode('dark')
            }}>
            <IconSun stroke={1.5} />
          </IconButton>
        </Tooltip>
      )}

      {/* Dark theme is active */}
      {isAutoTheme === false && colorMode === 'dark' && (
        <Tooltip label='Zmień motyw na automatyczny' placement='bottom-start'>
          <IconButton
            aria-label='Zmień motyw na automatyczny'
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
