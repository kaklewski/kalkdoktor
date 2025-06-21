import { Box, Card, Link, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { CalculatorType, SourceType } from '../../types/calculatorTypes'
import STRINGS from '../../data/strings'

type DetailsCardProps = {
  description: CalculatorType['description']
  methodology: CalculatorType['methodology']
  sources: CalculatorType['sources']
}

export default function DetailsCard({ description, methodology, sources }: DetailsCardProps) {
  return (
    <Card variant='outline'>
      <Tabs variant='enclosed' isFitted colorScheme='teal'>
        <TabList px={4} pt={4}>
          <Tab>{STRINGS.PAGES.CALCULATOR.DESCRIPTION}</Tab>
          <Tab>
            {sources && sources.length > 1
              ? STRINGS.PAGES.CALCULATOR.SOURCES
              : STRINGS.PAGES.CALCULATOR.SOURCE}
          </Tab>
          {methodology && <Tab>{STRINGS.PAGES.CALCULATOR.METHODOLOGY}</Tab>}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text>{description}</Text>
          </TabPanel>
          <TabPanel>
            {sources && sources.length > 1
              ? sources.map(sourceItem => {
                  return (
                    <SourceLink
                      key={sourceItem.id}
                      author={sourceItem.author}
                      title={sourceItem.title}
                      dateOfAccess={sourceItem.dateOfAccess}
                      link={sourceItem.link}
                    />
                  )
                })
              : STRINGS.PAGES.CALCULATOR.OWN_WORK}
          </TabPanel>
          {methodology && (
            <TabPanel>
              <Box>{methodology}</Box>
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Card>
  )
}

type SourceLinkProps = Omit<SourceType, 'id'>

function SourceLink({ author, title, dateOfAccess, link }: SourceLinkProps) {
  return (
    <Box mb={2}>
      <Link href={link} isExternal>
        <Text as='span'>
          {author}, <Text as='i'>{title}</Text>, {STRINGS.PAGES.CALCULATOR.ACCESS}: {dateOfAccess}
        </Text>
        <ExternalLinkIcon mx='2px' ml={1} mt={-1} />
      </Link>
    </Box>
  )
}
