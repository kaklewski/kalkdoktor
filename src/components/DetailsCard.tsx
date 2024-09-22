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

interface ComponentProps {
	description: string
	methodology: string | null
	sources: {
		id: number
		name: string
		link: string
	}[]
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
					{methodology === null ? '' : <Tab>Metodologia</Tab>}
				</TabList>

				<TabPanels>
					<TabPanel>
						<Text>{description}</Text>
					</TabPanel>
					<TabPanel>
						{sources.map(sourceItem => {
							if (sourceItem.link === '') {
								return (
									<Text key={sourceItem.id}>
										{sourceItem.name}
									</Text>
								)
							} else {
								return (
									<SourceLink
										key={sourceItem.id}
										name={sourceItem.name}
										link={sourceItem.link}
									/>
								)
							}
						})}
					</TabPanel>
					{methodology === null ? (
						''
					) : (
						<TabPanel>
							<Text>{methodology}</Text>
						</TabPanel>
					)}
				</TabPanels>
			</Tabs>
		</Card>
	)
}
