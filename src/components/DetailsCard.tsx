import { Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

interface Props {
	description: string
	source: string
	methodology: string
}

export default function DetailsCard({
	description,
	source,
	methodology,
}: Props) {
	return (
		<Card overflow='hidden' variant='outline'>
			<Tabs variant='enclosed' isFitted colorScheme='teal'>
				<TabList px={4} pt={4}>
					<Tab>Opis</Tab>
					<Tab>Źródła</Tab>
					<Tab>Metodologia</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<p>{description}</p>
					</TabPanel>
					<TabPanel>
						<p>{source}</p>
					</TabPanel>
					<TabPanel>
						<p>{methodology}</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Card>
	)
}
