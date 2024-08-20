import { Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

interface Props {
	description: string
	source: string
	interpretation: string
}

export default function DetailsCard({
	description,
	source,
	interpretation,
}: Props) {
	return (
		<Card overflow='hidden' variant='outline'>
			<Tabs variant='enclosed' isFitted colorScheme='teal'>
				<TabList px={4} pt={4}>
					<Tab>Opis</Tab>
					<Tab>Źródła</Tab>
					<Tab>Interpretacja</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<p>{description}</p>
					</TabPanel>
					<TabPanel>
						<p>{source}</p>
					</TabPanel>
					<TabPanel>
						<p>{interpretation}</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Card>
	)
}
