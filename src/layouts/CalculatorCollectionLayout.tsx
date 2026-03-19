import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import CalculatorCard from '../components/cards/CalculatorCard';
import CATEGORY_LABELS from '../data/categoryLabels';
import STORAGE_KEYS from '../data/storageKeys';
import { CalculatorType } from '../types/calculatorTypes';
import { getCategories, titleCaseWords } from '../utils/helpers';

type CalculatorCollectionLayoutProps = {
    title: string;
    actions: ReactNode;
    sorting: string;
    calculators: CalculatorType[];
};

const CalculatorCollectionLayout = ({
    title,
    actions,
    sorting,
    calculators,
}: CalculatorCollectionLayoutProps) => {
    const calculatorCategories: string[] = getCategories(calculators);

    return (
        <Stack spacing={8} >
            <Flex justify="space-between" gap={2}>
                <Heading as="h1">
                    <Text>{title}</Text>
                </Heading>
                <HStack gap={{ base: 2, md: 3 }}>{actions}</HStack>
            </Flex>

            {sorting === STORAGE_KEYS.SORT.ALPHABETICALLY && (
                <Stack spacing={4}>
                    {calculators.map((calculator) => (
                        <CalculatorCard
                            key={calculator.id}
                            id={calculator.id}
                            name={calculator.name}
                            link={calculator.urlPath}
                            description={calculator.description}
                        />
                    ))}
                </Stack>
            )}

            {sorting === STORAGE_KEYS.SORT.BY_SPECIALIZATION && (
                <Stack spacing={8}>
                    {calculatorCategories.map((category) => {
                        const categoryMeta = CATEGORY_LABELS[category];

                        return (
                            <Box key={category}>
                                <Heading
                                    as="h2"
                                    size="lg"
                                    pb={1}
                                    mb={3}
                                    borderBottomWidth="1px"
                                >
                                    {categoryMeta?.icon || '🩺'}{' '}
                                    {categoryMeta?.label ||
                                        titleCaseWords(category)}
                                </Heading>
                                <Stack spacing={4}>
                                    {calculators
                                        .filter(
                                            (calc) =>
                                                calc.category === category,
                                        )
                                        .map((calculator) => (
                                            <CalculatorCard
                                                key={calculator.id}
                                                id={calculator.id}
                                                name={calculator.name}
                                                link={calculator.urlPath}
                                                description={
                                                    calculator.description
                                                }
                                            />
                                        ))}
                                </Stack>
                            </Box>
                        );
                    })}
                </Stack>
            )}
        </Stack>
    );
};

export default CalculatorCollectionLayout;
