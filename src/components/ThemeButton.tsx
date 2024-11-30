import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react'
import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

export default function ThemeButton() {
  const [isAutoTheme, setIsAutoTheme] = useState<boolean>(() => {
    if (localStorage.getItem('auto-color-mode') === 'false') return false
    return true
  })
  const { colorMode, toggleColorMode, setColorMode } = useColorMode()

  // The useEffect below adds a data-theme attribute to the page body. This lets the CSS auto-adjust the theme and prevent incorrect theme flashing when switching pages. Identical function is hardcoded in the HTML directly, which handles setting a proper theme during the initial load.
  useEffect(() => {
    const body = document.querySelector('body')
    const theme = localStorage.getItem('chakra-ui-color-mode')
    if (body === null) return
    if (theme === 'light') body.setAttribute('data-theme', 'light')
    if (theme === 'dark') body.setAttribute('data-theme', 'dark')
  }, [colorMode])

  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')

  useEffect(() => {
    localStorage.setItem('auto-color-mode', `${isAutoTheme}`)

    if (isAutoTheme === false) return

    function changeTheme(event: any) {
      if (event.matches) {
        setColorMode('dark')
      } else {
        setColorMode('light')
      }
    }

    prefersDarkScheme.addEventListener('change', changeTheme)
    return () => prefersDarkScheme.removeEventListener('change', changeTheme)
  }, [isAutoTheme])

  return (
    <>
      {/* Auto theme is active */}
      {isAutoTheme === true && (
        <Tooltip label='Zmień motyw na jasny'>
          <IconButton
            aria-label='Zmień motyw na jasny'
            onClick={() => {
              setIsAutoTheme(false)
              setColorMode('light')
            }}>
            <IconSunMoon />
          </IconButton>
        </Tooltip>
      )}

      {/* Light theme is active */}
      {isAutoTheme === false && colorMode === 'light' && (
        <Tooltip label='Zmień motyw na ciemny'>
          <IconButton
            aria-label='Zmień motyw na ciemny'
            onClick={() => {
              setIsAutoTheme(false)
              setColorMode('dark')
            }}>
            <IconSun />
          </IconButton>
        </Tooltip>
      )}

      {/* Dark theme is active */}
      {isAutoTheme === false && colorMode === 'dark' && (
        <Tooltip label='Zmień motyw na automatyczny'>
          <IconButton
            aria-label='Zmień motyw na automatyczny'
            onClick={() => {
              setIsAutoTheme(true)
              setColorMode('system')
            }}>
            <IconMoon />
          </IconButton>
        </Tooltip>
      )}
    </>
  )
}
