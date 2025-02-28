import { Box, Card, Link, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { CalculatorType, SourceType } from '../../types/calculatorTypes'

type DetailsCardProps = {
  description: CalculatorType['description']
  methodology: CalculatorType['methodology']
  sources: CalculatorType['sources']
}

export default function DetailsCard({ description, methodology, sources }: DetailsCardProps) {
  sources = typeof sources !== 'object' ? null : sources
  return (
    <Card variant='outline'>
      <Tabs variant='enclosed' isFitted colorScheme='teal'>
        <TabList px={4} pt={4}>
          <Tab>Opis</Tab>
          <Tab>{sources && sources.length > 1 ? 'Źródła' : 'Źródło'}</Tab>
          {methodology && <Tab>Metodologia</Tab>}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text>{description}</Text>
          </TabPanel>
          <TabPanel>
            {sources === null
              ? 'Opracowanie własne.'
              : sources.map(sourceItem => {
                  return (
                    <SourceLink
                      key={sourceItem.id}
                      author={sourceItem.author}
                      title={sourceItem.title}
                      dateOfAccess={sourceItem.dateOfAccess}
                      link={sourceItem.link}
                    />
                  )
                })}
          </TabPanel>
          {methodology && (
            <TabPanel>
              <Text>{methodology}</Text>
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
          {author}, <Text as='i'>{title}</Text>, dostęp: {dateOfAccess}
        </Text>
        <ExternalLinkIcon mx='2px' ml={1} mt={-1} />
      </Link>
    </Box>
  )
}
