import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import STRINGS from '../../data/strings';
import ResultCard from './ResultCard';

describe('ResultCard', () => {
  it('shows no-result message when the result is null', () => {
    const interpretation = 'test interpretation';

    render(
      <ChakraProvider>
        <ResultCard result={null} interpretation={interpretation} />
      </ChakraProvider>,
    );

    const noResultMessage = screen.getByText(
      STRINGS.PAGES.CALCULATOR.NO_RESULT_MESSAGE,
    );
    expect(noResultMessage).toBeInTheDocument();
  });
  ``;

  it('shows the result when it is not null', () => {
    const result = '142 cm';

    render(
      <ChakraProvider>
        <ResultCard result={result} interpretation={null} />
      </ChakraProvider>,
    );

    const resultBlock = screen.getByText(result);
    expect(resultBlock).toHaveTextContent(result);
  });

  it('does not show the interpretation block when interpretation is null', () => {
    const result = '142 cm';

    render(
      <ChakraProvider>
        <ResultCard result={result} interpretation={null} />
      </ChakraProvider>,
    );

    const interpretationBlock = screen.queryByTestId('interpretation-block');
    expect(interpretationBlock).not.toBeInTheDocument();
  });

  it('shows the interpretation block when interpretation is not null', () => {
    const result = '142 cm';
    const interpretation = 'test interpretation';

    render(
      <ChakraProvider>
        <ResultCard result={result} interpretation={interpretation} />
      </ChakraProvider>,
    );

    const interpretationBlock = screen.getByTestId('interpretation-block');
    expect(interpretationBlock).toHaveTextContent(interpretation);
  });
});
