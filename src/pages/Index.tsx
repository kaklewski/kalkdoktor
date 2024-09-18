import { Calculator, calculators, categories } from '../calculators'
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Card,
	Link,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react'

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
								<AccordionItem>
									<h2>
										<AccordionButton>
											<Box
												as='span'
												flex='1'
												textAlign='left'>
												Section 1 title
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna
										aliqua. Ut enim ad minim veniam, quis
										nostrud exercitation ullamco laboris
										nisi ut aliquip ex ea commodo consequat.
									</AccordionPanel>
								</AccordionItem>

								<AccordionItem>
									<h2>
										<AccordionButton>
											<Box
												as='span'
												flex='1'
												textAlign='left'>
												Section 2 title
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna
										aliqua. Ut enim ad minim veniam, quis
										nostrud exercitation ullamco laboris
										nisi ut aliquip ex ea commodo consequat.
									</AccordionPanel>
								</AccordionItem>
							</Accordion>
						</TabPanel>
						<TabPanel>
							{sortedCalculators.map(calculator => (
								<div key={calculator.id}>
									<Link href={'/' + calculator.link}>
										{calculator.name}
									</Link>
								</div>
							))}
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Card>
		</Box>
	)
}
