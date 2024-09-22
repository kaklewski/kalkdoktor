import {
	Heading,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react'
import { sortedCalculators } from '../data/calculators-and-categories'
import CalculatorCard from '../components/CalculatorCard'
import { useState } from 'react'
import { categories } from '../data/calculators-and-categories'

export default function IndexPage() {
	// These two keys exist to make sure that when you add a calculator to favorites on one tab, it is also displayed as faved on the other one
	const [keyA, setKeyA] = useState<number>(0)
	const [keyB, setKeyB] = useState<number>(0)

	return (
		<Tabs colorScheme='teal' isFitted>
			<TabList>
				<Tab>Alfabetycznie</Tab>
				<Tab>Kategorie</Tab>
			</TabList>

			<TabPanels>
				<TabPanel px={0} key={keyA} onClick={() => setKeyB(k => k + 1)}>
					<Stack spacing={4}>
						{sortedCalculators.map(calculator => (
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
					<Stack spacing={8}>
						{categories.map((category, categoryId) => (
							<Stack key={categoryId} spacing={4}>
								<Heading as='h2' fontSize='2xl' ml={2}>
									{category[0].toUpperCase() +
										category.slice(1)}
								</Heading>
								{sortedCalculators
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
							</Stack>
						))}
					</Stack>
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}
