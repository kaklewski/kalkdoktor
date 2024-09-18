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

const sortedCalculators = calculators.sort((a: Calculator, b: Calculator) => {
	const keyA = a.name.toLowerCase()
	const keyB = b.name.toLowerCase()
	if (keyA < keyB) return -1
	if (keyA > keyB) return 1
	return 0
})

export default function Index() {
	return (
		<Box maxW='650px' mx='auto' px={4} py={8}>
			<Card variant='outline'>
				<Tabs isFitted variant='enclosed' colorScheme='teal'>
					<TabList px={4} pt={4}>
						<Tab>Kategorie</Tab>
						<Tab>Alfabetycznie</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<Accordion defaultIndex={[0]} allowMultiple>
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
						<TabPanel>
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
