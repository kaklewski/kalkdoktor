import {
	Box,
	Heading,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react'
import CalculatorCard from '../components/CalculatorCard'
import { useState } from 'react'
import { Calculator, categories } from '../data/calculators-and-categories'

interface ComponentProps {
	calculators: Calculator[]
}

export default function ListTabsLayout({ calculators }: ComponentProps) {
	// These two keys exist to make sure that when you add a calculator to favorites on one tab, it is also displayed as faved on the other one
	const [keyA, setKeyA] = useState<number>(0)
	const [keyB, setKeyB] = useState<number>(0)

	return (
		<Tabs colorScheme='teal' isFitted>
			<TabList mb={3}>
				<Tab>Alfabetycznie</Tab>
				<Tab>Kategorie</Tab>
			</TabList>

			<TabPanels>
				<TabPanel px={0} key={keyA} onClick={() => setKeyB(k => k + 1)}>
					<Stack spacing={6}>
						{calculators.map(calculator => (
							<CalculatorCard
								key={calculator.id}
								id={calculator.id}
								name={calculator.name}
								link={calculator.link}
								description={calculator.description}
							/>
						))}
					</Stack>
				</TabPanel>
				<TabPanel px={0} key={keyB} onClick={() => setKeyA(k => k + 1)}>
					<Stack spacing={6}>
						{categories.map((category, categoryId) => (
							<Box key={categoryId}>
								<Heading as='h2' fontSize='2xl' mt={2}>
									{category[0].toUpperCase() +
										category.slice(1)}
								</Heading>
								{calculators
									.filter(calc => calc.category === category)
									.map(calculator => (
										<CalculatorCard
											key={calculator.id}
											id={calculator.id}
											name={calculator.name}
											link={calculator.link}
											description={calculator.description}
										/>
									))}
							</Box>
						))}
					</Stack>
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}
