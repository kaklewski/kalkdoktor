import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import STRINGS from '../../data/strings';
import { CalculatorType, SourceType } from '../../types/calculatorTypes';

type DetailsCardProps = {
  description: CalculatorType['description'];
  methodology: CalculatorType['methodology'];
  sources: CalculatorType['sources'];
};

const DetailsCard = ({
  description,
  methodology,
  sources,
}: DetailsCardProps) => {
  const isOwnWork = sources === 'ownWork';
  const isOneSource =
    isOwnWork || (Array.isArray(sources) && sources.length === 1);

  return (
    <Card variant="outline" rounded="xl">
      <Tabs variant="enclosed" colorScheme="teal" isFitted isLazy>
        <TabList px={4} pt={4}>
          <Tab>{STRINGS.PAGES.CALCULATOR.DESCRIPTION}</Tab>
          <Tab>
            {isOneSource
              ? STRINGS.PAGES.CALCULATOR.SOURCE
              : STRINGS.PAGES.CALCULATOR.SOURCES}
          </Tab>
          {methodology && <Tab>{STRINGS.PAGES.CALCULATOR.METHODOLOGY}</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text>{description}</Text>
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

type SourceLinkProps = Omit<SourceType, 'id'>;

const SourceLink = ({ author, title, dateOfAccess, link }: SourceLinkProps) => (
  <Box mb={2}>
    <Link href={link} isExternal>
      <Text as="span">
        {author}, <Text as="i">{title}</Text>, {STRINGS.PAGES.CALCULATOR.ACCESS}
        : {dateOfAccess}
      </Text>
      <ExternalLinkIcon ml={1} mt={-1} />
    </Link>
  </Box>
);

export default DetailsCard;
