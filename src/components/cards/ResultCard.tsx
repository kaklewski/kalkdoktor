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

type ResultCardProps = {
  result: number | string;
  interpretation: string;
};

const ResultCard = ({ result, interpretation }: ResultCardProps) => {
  const [isAnimation, setIsAnimation] = useState<boolean>(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
      return;
    }

    const setAnimationTimeout = setTimeout(() => {
      setIsAnimation(true);
    }, 0);

    const isAnimationTimeout = setTimeout(() => {
      setIsAnimation(false);
    }, 301);

    return () => {
      clearTimeout(setAnimationTimeout);
      clearTimeout(isAnimationTimeout);
    };
  }, [result, interpretation]);

  return (
    <Card
      overflow="hidden"
      variant="filled"
      rounded="xl"
      id="resultCard"
      data-card-animation={isAnimation}
    >
      <CardHeader>
        <Heading as="p" size="md">
          {STRINGS.PAGES.CALCULATOR.RESULT}: {result}
        </Heading>
      </CardHeader>

      <Divider />

      <CardBody>
        <Text>{interpretation}</Text>
      </CardBody>
    </Card>
  );
};

export default ResultCard;
