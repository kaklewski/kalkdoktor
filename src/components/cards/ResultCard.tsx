import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import STRINGS from '../../data/strings';
import { CalculatorType } from '../../types/calculatorTypes';

type ResultCardProps = {
  result: number;
  resultUnit: CalculatorType['resultUnit'];
  resultInterpretation: string;
};

export default function ResultCard({
  result = 0,
  resultUnit,
  resultInterpretation,
}: ResultCardProps) {
  const [isAnimation, setIsAnimation] = useState<boolean>(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
      return;
    }

    setIsAnimation(true);

    const isAnimationTimeout = setTimeout(() => {
      setIsAnimation(false);
    }, 301);

    return () => clearTimeout(isAnimationTimeout);
  }, [result]);

  const formattedResult = result.toFixed(1).replace(/\.0$/, '');
  const formattedResultUnit =
    resultUnit &&
    `${resultUnit === '%' || resultUnit === '‰' ? '' : ' '}${resultUnit}`;

  return (
    <Card
      overflow="hidden"
      variant="filled"
      id="resultCard"
      data-card-animation={isAnimation}
    >
      <CardHeader>
        <Heading as="p" size="md">
          {STRINGS.PAGES.CALCULATOR.RESULT}: {formattedResult}
          {formattedResultUnit}
        </Heading>
      </CardHeader>

      <Divider />

      <CardBody>
        <Text>{resultInterpretation}</Text>
      </CardBody>
    </Card>
  );
}
