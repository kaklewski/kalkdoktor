import { Calculator, calculators, categories } from '../calculators'
import {
	Accordion,
	Box,
	Card,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react'
import CalculatorCard from '../components/CalculatorCard'
import CustomAccordionItem from '../components/CustomAccordionItem'
import { useState } from 'react'

const sortedCalculators = calculators.sort((a: Calculator, b: Calculator) => {
	const keyA = a.name.toLowerCase()
	const keyB = b.name.toLowerCase()
	if (keyA < keyB) return -1
	if (keyA > keyB) return 1
	return 0
})

export default function Index() {
	// These two keys exist to make sure that when you add a calculator to favorites on one tab, it is also displayed as faved on the other one
	const [keyA, setKeyA] = useState<number>(0)
	const [keyB, setKeyB] = useState<number>(0)

	return (
		<Box maxW='650px' mx='auto' px={4} py={8}>
			<Card variant='outline'>
				<Tabs isFitted variant='enclosed' colorScheme='teal'>
					<TabList px={4} pt={4}>
						<Tab>Kategorie</Tab>
						<Tab>Alfabetycznie</Tab>
					</TabList>

					<TabPanels>
						<TabPanel
							key={keyA}
							onClick={() => setKeyB(k => k + 1)}>
							<Accordion>
								{categories.map(category => (
									<CustomAccordionItem
										key={category}
										title={category}>
										<Stack spacing={4}>
											{sortedCalculators
												.filter(
													calc =>
														calc.category ===
														category
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
										</Stack>
									</CustomAccordionItem>
								))}
							</Accordion>
						</TabPanel>
						<TabPanel
							key={keyB}
							onClick={() => setKeyA(k => k + 1)}>
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
					</TabPanels>
				</Tabs>
			</Card>
		</Box>
	)
}
