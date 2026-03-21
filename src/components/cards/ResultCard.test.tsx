import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import STRINGS from '../../data/strings';
import { render } from '../../test/render';
import ResultCard from './ResultCard';

describe('ResultCard', () => {
    it('shows no-result message when the result is null', () => {
        const interpretation = 'test interpretation';

        render(
            <ResultCard
                result={null}
                resultUnit="cm"
                interpretation={interpretation}
            />,
        );

        const noResultMessage = screen.getByText(
            STRINGS.PAGES.CALCULATOR.NO_RESULT_MESSAGE,
        );
        expect(noResultMessage).toBeInTheDocument();
    });

    it('shows the result when it is not null', () => {
        const result = 142;
        const resultUnit = 'cm';
        const expectedResult = `${result} ${resultUnit}`;

        render(
            <ResultCard
                result={result}
                resultUnit={resultUnit}
                interpretation={null}
            />,
        );

        const resultBlock = screen.getByText(result);
        expect(resultBlock).toHaveTextContent(expectedResult);
    });

    it('does not show the interpretation block when interpretation is null', () => {
        const result = 142;
        const resultUnit = 'cm';

        render(
            <ResultCard
                result={result}
                resultUnit={resultUnit}
                interpretation={null}
            />,
        );

        const interpretationBlock = screen.queryByTestId(
            'interpretation-block',
        );
        expect(interpretationBlock).not.toBeInTheDocument();
    });

    it('shows the interpretation block when interpretation is not null', () => {
        const result = 142;
        const resultUnit = 'cm';
        const interpretation = 'test interpretation';

        render(
            <ResultCard
                result={result}
                resultUnit={resultUnit}
                interpretation={interpretation}
            />,
        );

        const interpretationBlock = screen.getByTestId('interpretation-block');
        expect(interpretationBlock).toHaveTextContent(interpretation);
    });
});
