import { ChakraProvider } from '@chakra-ui/react';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

const customRender = (ui: ReactElement, options?: RenderOptions) => {
  return render(ui, {
    wrapper: ({ children }) => <ChakraProvider>{children}</ChakraProvider>,
    ...options,
  });
};

export { customRender as render };
