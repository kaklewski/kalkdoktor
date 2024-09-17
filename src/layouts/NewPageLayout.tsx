import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Divider,
	Flex,
	Heading,
	Spacer,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from '@chakra-ui/react'
import { calculators } from '../calculators'
import CustomNumberInput from '../components/CustomNumberInput'
import FavButton from '../components/FavButton'
import { Form } from 'react-router-dom'
import { useState } from 'react'
import SourceLink from '../components/SourceLink'
import NewFormCard from '../components/NewFormCard'

function findCalculator(searchedId: number) {
	for (const calculator of calculators) {
		if (calculator.id === searchedId) return calculator
	}
}

function changeDocumentTitle(title: string | undefined) {
	if (typeof title === 'string') document.title = title + ' – Kalkdoktor'
}

interface Props {
	calcId: number
}

export default function NewPageLayout({ calcId }: Props) {
	const [result, setResult] = useState(0)

	const calculator = findCalculator(calcId)
	const resultInterpretation = calculator?.interpretResult(result)

	changeDocumentTitle(calculator?.name)

	return (
		<Box maxW='650px' mx='auto' px={4} py={8}>
			<Stack spacing={8}>
				<Flex>
					<Heading as='h1'>{calculator?.name}</Heading>
					<Spacer />
					<FavButton />
				</Flex>

				<NewFormCard calculator={calculator} setResult={setResult} />

				<Card overflow='hidden' variant='filled'>
					<CardHeader>
						<Heading size='md'>Wynik: {result}</Heading>
					</CardHeader>
					<Divider color='white' />
					<CardBody>
						<Text>{resultInterpretation}</Text>
					</CardBody>
				</Card>

				<Card overflow='hidden' variant='outline'>
					<Tabs variant='enclosed' isFitted colorScheme='teal'>
						<TabList px={4} pt={4}>
							<Tab>Opis</Tab>
							<Tab>Źródła</Tab>
							{/* <Tab>Metodologia</Tab> */}
						</TabList>

						<TabPanels>
							<TabPanel>
								<p>{calculator?.description}</p>
							</TabPanel>
							<TabPanel>
								{calculator?.sources.map((sourceItem: any) => {
									return (
										<SourceLink
											key={sourceItem.id}
											name={sourceItem.name}
											link={sourceItem.link}
										/>
									)
								})}
							</TabPanel>
							{/* <TabPanel>
								<p>{calculator?.methodology}</p>
							</TabPanel> */}
						</TabPanels>
					</Tabs>
				</Card>
			</Stack>
		</Box>
	)
}
