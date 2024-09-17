import { Card, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import SourceLink from './SourceLink'

interface Props {
	description: string | undefined
	sources: any
	methodology: string | undefined
}

export default function DetailsCard({
	description,
	sources,
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
						{sources.map((sourceItem: any) => {
							return (
								<SourceLink
									key={sourceItem.id}
									name={sourceItem.name}
									link={sourceItem.link}
								/>
							)
						})}
					</TabPanel>
					<TabPanel>
						<p>{methodology}</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Card>
	)
}
