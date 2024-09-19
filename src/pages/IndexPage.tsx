import { Calculator, calculators, categories } from '../calculators'
import {
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

const sortedCalculators = calculators.sort((a: Calculator, b: Calculator) => {
	const keyA = a.name.toLowerCase()
	const keyB = b.name.toLowerCase()
	if (keyA < keyB) return -1
	if (keyA > keyB) return 1
	return 0
})

export default function IndexPage() {
	// These two keys exist to make sure that when you add a calculator to favorites on one tab, it is also displayed as faved on the other one
	const [keyA, setKeyA] = useState<number>(0)
	const [keyB, setKeyB] = useState<number>(0)

	return (
		<>
			<Tabs colorScheme='teal' isFitted>
				<TabList mb={3}>
					<Tab>Alfabetycznie</Tab>
					<Tab>Kategorie</Tab>
				</TabList>

				<TabPanels>
					<TabPanel
						px={0}
						key={keyA}
						onClick={() => setKeyB(k => k + 1)}>
						<Stack spacing={6}>
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
					<TabPanel
						px={0}
						key={keyB}
						onClick={() => setKeyA(k => k + 1)}>
						<Stack spacing={6}>
							{categories.map(category => (
								<>
									<Heading as='h2' mt={4} mb={1}>
										{category[0].toUpperCase() +
											category.slice(1)}
									</Heading>
									{sortedCalculators
										.filter(
											calc => calc.category === category
										)
										.map(calculator => (
											<CalculatorCard
												key={calculator.id}
												id={calculator.id}
												name={calculator.name}
												link={calculator.link}
												description={
													calculator.description
												}
											/>
										))}
								</>
							))}
						</Stack>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	)
}
