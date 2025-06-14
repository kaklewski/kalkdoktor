import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import './assets/main.scss'
import { theme } from './theme'
import { MathJaxContext } from 'better-react-mathjax'

const mathJaxConfig = {
  loader: { load: ['input/asciimath'] },
  options: {
    enableMenu: false,
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <MathJaxContext config={mathJaxConfig}>
        <App />
      </MathJaxContext>
    </ChakraProvider>
  </StrictMode>
)
