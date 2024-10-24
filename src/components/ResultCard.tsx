import {
	Card,
	CardBody,
	CardHeader,
	Divider,
	Heading,
	Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Calculator from '../types/calculatorInterface'

interface ComponentProps {
	result: number
	resultUnit: Calculator['resultUnit']
	resultInterpretation: string
}

export default function ResultCard({
	result,
	resultUnit,
	resultInterpretation,
}: ComponentProps) {
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
	const [resultCardAnimation, setResultCardAnimation] = useState('')

	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false)
			return
		}

		setResultCardAnimation('animation')
		setTimeout(() => {
			setResultCardAnimation('')
		}, 300)
	}, [result, resultInterpretation])

	if (Number.isNaN(result)) result = 0

	return (
		<Card
			overflow='hidden'
			variant='filled'
			id='resultCard'
			className={resultCardAnimation}>
			<CardHeader>
				<Heading size='md'>
					Wynik: {result.toFixed(1).replace(/\.0$/, '')}
					{resultUnit && ` ${resultUnit}`}
				</Heading>
			</CardHeader>

			<Divider color='white' />

			<CardBody>
				<Text>{resultInterpretation}</Text>
			</CardBody>
		</Card>
	)
}
