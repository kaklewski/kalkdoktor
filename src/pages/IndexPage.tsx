import {
	Box,
	Divider,
	Heading,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react'
import { sortedCalculators } from '../data/sortedCalculators'
import CalculatorCard from '../components/CalculatorCard'
import { useState } from 'react'
import { categories } from '../data/categories'

export default function IndexPage() {
	// These two keys exist to make sure that when you add a calculator to favorites on one tab, it is also displayed as faved on the other one
	const [keyA, setKeyA] = useState<number>(0)
	const [keyB, setKeyB] = useState<number>(0)

	return (
		<Tabs colorScheme='teal' isFitted>
			<TabList mb={4}>
				<Tab>Alfabetycznie</Tab>
				<Tab>Kategorie</Tab>
			</TabList>

			<TabPanels>
				<TabPanel px={0} key={keyA} onClick={() => setKeyB(k => k + 1)}>
					<Stack spacing={6}>
						{sortedCalculators.map(calculator => (
							<CalculatorCard
								key={calculator.id}
								id={calculator.id}
								name={calculator.name}
								link={calculator.urlPath}
								description={calculator.description}
							/>
						))}
					</Stack>
				</TabPanel>
				<TabPanel px={0} key={keyB} onClick={() => setKeyA(k => k + 1)}>
					<Stack spacing={12}>
						{categories.map((category, categoryId) => (
							<Box key={categoryId}>
								<Box mb={6}>
									<Heading as='h2' fontSize='2xl'>
										{category.toUpperCase()}
									</Heading>
									<Divider mt={2} />
								</Box>
								<Stack spacing={6}>
									{sortedCalculators
										.filter(
											calc => calc.category === category
										)
										.map(calculator => (
											<CalculatorCard
												key={calculator.id}
												id={calculator.id}
												name={calculator.name}
												link={calculator.urlPath}
												description={
													calculator.description
												}
											/>
										))}
								</Stack>
							</Box>
						))}
					</Stack>
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}
