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
import { forwardRef } from 'react';

import STRINGS from '../../data/strings';
import { InterpretationModel, ResultModel } from '../../types/calculatorModels';

type ResultCardProps = {
    result: ResultModel;
    interpretation: InterpretationModel;
};

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(
    ({ result, interpretation }, ref) => {
        const isResult = result != null;
        const isInterpretation = interpretation != null;
        const resultInterpretationKey = `${result}-${interpretation}`; // This will force the card to re-render when result or interpretation changes

        return (
            <Card
                key={resultInterpretationKey}
                ref={ref}
                variant="filled"
                rounded="lg"
                id="resultCard" // ID is used for animation
                data-card-animation={isResult}
                scrollMarginTop={{ base: '100px', lg: '200px' }}
            >
                {isResult ? (
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

                            {isInterpretation && (
                                <Box
                                    w="100%"
                                    pt={4}
                                    borderTopWidth="1px"
                                    data-testid="interpretation-block"
                                >
                                    <Text fontSize="md" lineHeight="tall">
                                        {interpretation}
                                    </Text>
                                </Box>
                            )}
                        </VStack>
                    </CardBody>
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
