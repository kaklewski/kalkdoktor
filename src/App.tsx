import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Card,
	CardBody,
	CardHeader,
	Checkbox,
	Divider,
	Flex,
	Heading,
	Icon,
	IconButton,
	Radio,
	RadioGroup,
	Spacer,
	Stack,
	StackDivider,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'

export default function App() {
	const lowRisk: string = 'Niskie ryzyko powikłań. Nie zaleca się leczenia.'
	const mediumRisk: string =
		'Umiarkowane ryzyko powikłań. Można rozważyć doustny antykoagulant.'
	const highRisk: string =
		'Wysokie ryzyko powikłań. Należy zastosować doustny antykoagulant.'

	const [result, setResult] = useState(0)
	const [interpretation, setInterpretation] = useState(lowRisk)

	useEffect(() => {
		provideInterpretation()
	}, [result])

	function calculateResult(setResult: any) {
		const inputs = document.querySelectorAll('input')
		let sum: number = 0

		inputs.forEach(input => {
			if (input.checked) sum += parseInt(input.value)
		})

		setResult(sum)
	}

	function provideInterpretation() {
		const isMan = (document.getElementById('man') as HTMLInputElement)
			.checked
		let interpretationText: string = lowRisk

		if (isMan) {
			if (result <= 0) interpretationText = lowRisk
			if (result == 1) interpretationText = mediumRisk
			if (result >= 2) interpretationText = highRisk
		} else {
			if (result <= 1) interpretationText = lowRisk
			if (result == 2) interpretationText = mediumRisk
			if (result >= 3) interpretationText = highRisk
		}

		setInterpretation(interpretationText)
	}

	return (
		<>
		<Navbar/>
		<Box
			maxW='650px'
			mx='auto'
			p={4}
			onChange={() => calculateResult(setResult)}>
			<Stack spacing={8}>
				<Flex>
					<Heading as='h1'>
						Skala CHA<sub>2</sub>DS<sub>2</sub>-VASc
					</Heading>

					<Spacer />

					<IconButton
						aria-label='Dodaj do ulubionych'
						icon={
							<Icon>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'>
									<path
										stroke='none'
										d='M0 0h24v24H0z'
										fill='none'
									/>
									<path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
								</svg>
							</Icon>
						}
					/>
				</Flex>

				<Card overflow='hidden' variant='outline'>
					<CardBody>
						<Stack divider={<StackDivider />} spacing={4}>
							<Box>
								<Checkbox value='1' colorScheme='teal' w='100%'>
									Zastoinowa niewydolność serca / dysfunkcja
									lewej komory
								</Checkbox>
							</Box>
							<Box>
								<Checkbox value='1' colorScheme='teal' w='100%'>
									Nadciśnienie tętnicze
								</Checkbox>
							</Box>
							<Box>
								<Checkbox value='1' colorScheme='teal' w='100%'>
									Cukrzyca
								</Checkbox>
							</Box>
							<Box>
								<Checkbox value='1' colorScheme='teal' w='100%'>
									Choroba naczyniowa (przebyty zawał serca,
									miażdżycowa choroba tętnic obwodowych,
									blaszki miażdżycowe w aorcie)
								</Checkbox>
							</Box>
							<Box>
								<Checkbox value='2' colorScheme='teal' w='100%'>
									Przebyty udar mózgu / TIA / incydent
									zakrzepowo-zatorowy
								</Checkbox>
							</Box>
							<Box>
								<RadioGroup defaultValue='0' colorScheme='teal'>
									<Stack>
										<Text>Płeć:</Text>
										<Radio value='0' id='man'>
											Mężczyzna
										</Radio>
										<Radio value='1'>Kobieta</Radio>
									</Stack>
								</RadioGroup>
							</Box>
							<Box>
								<RadioGroup defaultValue='0' colorScheme='teal'>
									<Stack>
										<Text>Wiek:</Text>
										<Radio value='0'>
											Mniej niż 65 lat
										</Radio>
										<Radio value='1'>65 – 74 lata</Radio>
										<Radio value='2'>
											75 lat lub więcej
										</Radio>
									</Stack>
								</RadioGroup>
							</Box>
						</Stack>
					</CardBody>
				</Card>

				<Card overflow='hidden' variant='filled'>
					<CardHeader>
						<Heading size='md'>Wynik: {result}</Heading>
					</CardHeader>
					<Divider color='white' />
					<CardBody>
						<Text>{interpretation}</Text>
					</CardBody>
				</Card>

				<Card overflow='hidden' variant='outline'>
					<Tabs variant='enclosed' isFitted colorScheme='teal'>
						<TabList px={4} pt={4}>
							<Tab>Opis</Tab>
							<Tab>Źródła</Tab>
							<Tab>Interpretacja</Tab>
						</TabList>

						<TabPanels>
							<TabPanel>
								<p>
									Skala służąca do oceny ryzyka wystąpienia
									powikłań zakrzepowo–zatorowych u pacjentów z
									migotaniem przedsionków. Skala umożliwia
									wskazanie pacjentów z migotaniem
									przedsionków, u których konieczne jest
									wdrożenie terapii przeciwpłytkowej lub
									przeciwzakrzepowej.
								</p>
							</TabPanel>
							<TabPanel>
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Nihil, voluptate.
								</p>
							</TabPanel>
							<TabPanel>
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Temporibus reiciendis
									aperiam placeat nobis, dolorum laborum,
									nemo, eos quidem esse ducimus expedita amet
									repellendus nesciunt enim. Quae pariatur
									numquam aliquam doloremque.
								</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Card>

				<Card overflow='hidden' variant='outline'>
					<Accordion defaultIndex={[0]} allowMultiple>
						<AccordionItem borderY='0'>
							<AccordionButton
								py={4}
								_hover={{
									background: 'gray.100',
								}}>
								<Box flex='1' textAlign='left'>
									<Heading size='sm'>Opis</Heading>
								</Box>
								<AccordionIcon />
							</AccordionButton>
							<AccordionPanel pb={4}>
								Skala służąca do oceny ryzyka wystąpienia
								powikłań zakrzepowo–zatorowych u pacjentów z
								migotaniem przedsionków. Skala umożliwia
								wskazanie pacjentów z migotaniem przedsionków, u
								których konieczne jest wdrożenie terapii
								przeciwpłytkowej lub przeciwzakrzepowej.
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem borderBottom='0'>
							<AccordionButton
								py={4}
								_hover={{
									background: 'gray.100',
								}}>
								<Box flex='1' textAlign='left'>
									<Heading size='sm'>Źródła</Heading>
								</Box>
								<AccordionIcon />
							</AccordionButton>
							<AccordionPanel pb={4}>
								Lorem ipsum dolor sit amet.
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem borderBottom='0'>
							<AccordionButton
								py={4}
								_hover={{
									background: useColorModeValue('gray.100', 'gray.700'),
								}}>
								<Box flex='1' textAlign='left'>
									<Heading size='sm'>Interpretacja</Heading>
								</Box>
								<AccordionIcon />
							</AccordionButton>
							<AccordionPanel pb={4}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat.
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				</Card>
			</Stack>
		</Box>
		</>
	)
}
