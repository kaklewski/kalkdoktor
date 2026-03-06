import {
  Box,
  Card,
  CardBody,
  Center,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { IconCalculatorOff } from '@tabler/icons-react';
import { forwardRef, useEffect, useRef, useState } from 'react';

import STRINGS from '../../data/strings';
import { Interpretation, Result } from '../../types/calculatorTypes';

type ResultCardProps = {
  result: Result;
  interpretation: Interpretation;
};

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(
  ({ result, interpretation }, ref) => {
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
        ref={ref}
        variant="filled"
        rounded="lg"
        // ID is used for animation
        id="resultCard"
        data-card-animation={isAnimation}
        scrollMarginTop={{ base: '100px', lg: '200px' }}
      >
        {result != null ? (
          <>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Text
                  fontSize="sm"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  color="gray.500"
                >
                  {STRINGS.PAGES.CALCULATOR.RESULT}
                </Text>
                <Heading size="xl">{result}</Heading>

                {interpretation && (
                  <Box w="100%" pt={4} borderTopWidth="1px">
                    <Text fontSize="md" lineHeight="tall">
                      {interpretation}
                    </Text>
                  </Box>
                )}
              </VStack>
            </CardBody>
          </>
        ) : (
          <CardBody>
            <Center py={2}>
              <VStack spacing={4}>
                <IconCalculatorOff stroke={1.5} size={50} />
                <Text color="gray.500">
                  {STRINGS.PAGES.CALCULATOR.NO_RESULT_MESSAGE}
                </Text>
              </VStack>
            </Center>
          </CardBody>
        )}
      </Card>
    );
  },
);

ResultCard.displayName = 'ResultCard';

export default ResultCard;
