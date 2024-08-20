import {
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
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import DetailsCard from './components/DetailsCard'
import ResultCard from './components/ResultCard'
import FavButton from './components/FavButton'

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
			<Navbar />
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

						<FavButton />
					</Flex>

					<Card overflow='hidden' variant='outline'>
						<CardBody>
							<Stack divider={<StackDivider />} spacing={4}>
								<Box>
									<Checkbox
										value='1'
										colorScheme='teal'
										w='100%'>
										Zastoinowa niewydolność serca /
										dysfunkcja lewej komory
									</Checkbox>
								</Box>
								<Box>
									<Checkbox
										value='1'
										colorScheme='teal'
										w='100%'>
										Nadciśnienie tętnicze
									</Checkbox>
								</Box>
								<Box>
									<Checkbox
										value='1'
										colorScheme='teal'
										w='100%'>
										Cukrzyca
									</Checkbox>
								</Box>
								<Box>
									<Checkbox
										value='1'
										colorScheme='teal'
										w='100%'>
										Choroba naczyniowa (przebyty zawał
										serca, miażdżycowa choroba tętnic
										obwodowych, blaszki miażdżycowe w
										aorcie)
									</Checkbox>
								</Box>
								<Box>
									<Checkbox
										value='2'
										colorScheme='teal'
										w='100%'>
										Przebyty udar mózgu / TIA / incydent
										zakrzepowo-zatorowy
									</Checkbox>
								</Box>
								<Box>
									<RadioGroup
										defaultValue='0'
										colorScheme='teal'>
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
									<RadioGroup
										defaultValue='0'
										colorScheme='teal'>
										<Stack>
											<Text>Wiek:</Text>
											<Radio value='0'>
												Mniej niż 65 lat
											</Radio>
											<Radio value='1'>
												65 – 74 lata
											</Radio>
											<Radio value='2'>
												75 lat lub więcej
											</Radio>
										</Stack>
									</RadioGroup>
								</Box>
							</Stack>
						</CardBody>
					</Card>

					<ResultCard
						result={result}
						interpretation={interpretation}
					/>

					<DetailsCard
						description='Skala służąca do oceny ryzyka
										wystąpienia powikłań
										zakrzepowo–zatorowych u pacjentów z
										migotaniem przedsionków. Skala umożliwia
										wskazanie pacjentów z migotaniem
										przedsionków, u których konieczne jest
										wdrożenie terapii przeciwpłytkowej lub
										przeciwzakrzepowej.'
						source='Lorem ipsum dolor sit amet consecteturs
										adipisicing elit. Nihil, voluptate.'
						interpretation='	Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Temporibus reiciendis
										aperiam placeat nobis, dolorum laborum,
										nemo, eos quidem esse ducimus expedita
										amet repellendus nesciunt enim. Quae
										pariatur numquam aliquam doloremque.'
					/>
				</Stack>
			</Box>
		</>
	)
}
