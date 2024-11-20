import {
  Card,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import SourceLink from './SourceLink'
import Calculator from '../types/calculatorType'

interface ComponentProps {
  description: Calculator['description']
  methodology: Calculator['methodology']
  sources: Calculator['sources']
}

export default function DetailsCard({
  description,
  methodology,
  sources,
}: ComponentProps) {
  return (
    <Card variant='outline'>
      <Tabs variant='enclosed' isFitted colorScheme='teal'>
        <TabList px={4} pt={4}>
          <Tab>Opis</Tab>
          <Tab>Źródła</Tab>
          {methodology && <Tab>Metodologia</Tab>}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Text>{description}</Text>
          </TabPanel>
          <TabPanel>
            {typeof sources === 'string'
              ? sources
              : sources.map(sourceItem => {
                  return (
                    <SourceLink
                      key={sourceItem.id}
                      name={sourceItem.name}
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
