import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Box,
    Card,
    Link,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';

import CATEGORY_LABELS from '../../data/categoryLabels';
import STRINGS from '../../data/strings';
import { CalculatorModel, SourceModel } from '../../types/calculatorModels';
import { formatDate } from '../../utils/helpers';

type DetailsCardProps = {
    description: CalculatorModel['description'];
    methodology: CalculatorModel['methodology'];
    sources: CalculatorModel['sources'];
    category: CalculatorModel['category'];
};

const DetailsCard = ({
    description,
    methodology,
    sources,
    category,
}: DetailsCardProps) => {
    const isOwnWork = sources === 'ownWork';
    const isOneSource =
        isOwnWork || (Array.isArray(sources) && sources.length === 1);

    const categoryName: string = CATEGORY_LABELS[category]?.label || category;

    return (
        <Card variant="outline" rounded="lg">
            <Tabs variant="enclosed" colorScheme="teal" isFitted isLazy>
                <TabList px={4} pt={4}>
                    <Tab>{STRINGS.PAGES.CALCULATOR.DETAILS}</Tab>
                    <Tab>
                        {isOneSource
                            ? STRINGS.PAGES.CALCULATOR.SOURCE
                            : STRINGS.PAGES.CALCULATOR.SOURCES}
                    </Tab>
                    {methodology && (
                        <Tab>{STRINGS.PAGES.CALCULATOR.METHODOLOGY}</Tab>
                    )}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Stack spacing={2}>
                            <Text>
                                <Text as="span" fontWeight="bold">
                                    {STRINGS.PAGES.CALCULATOR.DESCRIPTION}:
                                </Text>{' '}
                                {description}
                            </Text>

                            <Text>
                                <Text as="span" fontWeight="bold">
                                    {STRINGS.PAGES.CALCULATOR.CATEGORY}:
                                </Text>{' '}
                                {categoryName}
                            </Text>
                        </Stack>
                    </TabPanel>
                    <TabPanel>
                        {isOwnWork
                            ? STRINGS.PAGES.CALCULATOR.OWN_WORK
                            : sources.map((source) => (
                                  <SourceLink
                                      key={source.id}
                                      author={source.author}
                                      title={source.title}
                                      dateOfAccess={source.dateOfAccess}
                                      link={source.link}
                                  />
                              ))}
                    </TabPanel>
                    {methodology && <TabPanel>{methodology}</TabPanel>}
                </TabPanels>
            </Tabs>
        </Card>
    );
};

type SourceLinkProps = Omit<SourceModel, 'id'>;

const SourceLink = ({ author, title, dateOfAccess, link }: SourceLinkProps) => (
    <Box mb={2}>
        <Link href={link} isExternal>
            <Text as="span">
                {author}, <Text as="i">{title}</Text>,{' '}
                {STRINGS.PAGES.CALCULATOR.ACCESS}: {formatDate(dateOfAccess)}
            </Text>
            <ExternalLinkIcon ml={1} mt={-1} />
        </Link>
    </Box>
);

export default DetailsCard;
