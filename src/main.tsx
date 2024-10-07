import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'
import './assets/main.scss'

const config: ThemeConfig = {
	initialColorMode: 'system',
	useSystemColorMode: true,
}

const theme = extendTheme({ config })

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</StrictMode>
)
