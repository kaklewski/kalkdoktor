import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useEffect } from 'react'

export default function ThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode()

  // The useEffect below adds a data-theme attribute to the page body. This lets the CSS auto-adjust the theme and prevent incorrect theme flashing when switching pages. Identical function is hardcoded in the HTML directly, which handles setting a proper theme during the initial load.
  useEffect(() => {
    const body = document.querySelector('body')
    if (body === null) return

    const theme = localStorage.getItem('chakra-ui-color-mode')
    if (theme === 'light') body.setAttribute('data-theme', 'light')
    if (theme === 'dark') body.setAttribute('data-theme', 'dark')
  }, [colorMode])

  return (
    <Tooltip
      label={`Zmień motyw na ${colorMode === 'light' ? 'ciemny' : 'jasny'}`}>
      <IconButton
        onClick={() => {
          toggleColorMode()
        }}
        aria-label={`Zmień motyw na ${
          colorMode === 'light' ? 'ciemny' : 'jasny'
        }`}>
        {colorMode === 'light' ? (
          <IconSun stroke={1.5} />
        ) : (
          <IconMoon stroke={1.5} />
        )}
      </IconButton>
    </Tooltip>
  )
}
