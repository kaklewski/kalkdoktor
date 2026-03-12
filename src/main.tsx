import { ChakraProvider } from '@chakra-ui/react';
import { MathJaxContext } from 'better-react-mathjax';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import mathJaxConfig from './config/mathJaxConfig';
import { theme } from './theme';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ChakraProvider theme={theme}>
            <MathJaxContext config={mathJaxConfig}>
                <App />
            </MathJaxContext>
        </ChakraProvider>
    </StrictMode>,
);
