import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react'
import { IconMoon, IconSun } from '@tabler/icons-react'

export default function ThemeButton() {
	const { colorMode, toggleColorMode } = useColorMode()

	// The function below adds a data-theme attribute to the page body. This lets the CSS auto adjust the theme and prevent incorrect theme flashing when switching pages. IDentical function is hardcoded in the HTML directly, which handles setting a proper theme during the initial load.
	function addThemeAttributeToBody() {
		const theme = localStorage.getItem('chakra-ui-color-mode')
		const body = document.querySelector('body')
		if (body === null) return

		if (theme === 'light') body.setAttribute('data-theme', 'light')
		if (theme === 'dark') body.setAttribute('data-theme', 'dark')
	}

	return (
		<Tooltip
			label={`Zmień motyw na ${
				colorMode === 'light' ? 'ciemny' : 'jasny'
			}`}>
			<IconButton
				onClick={() => {
					toggleColorMode()
					addThemeAttributeToBody()
				}}
				aria-label={`Zmień motyw na ${
					colorMode === 'light' ? 'ciemny' : 'jasny'
				}`}>
				{colorMode === 'light' ? (
					<IconMoon stroke={1.5} />
				) : (
					<IconSun stroke={1.5} />
				)}
			</IconButton>
		</Tooltip>
	)
}
