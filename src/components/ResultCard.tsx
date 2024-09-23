import {
	Card,
	CardBody,
	CardHeader,
	Divider,
	Heading,
	Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface ComponentProps {
	result: number
	resultUnit: string | null
	interpretResult: (result: number) => string
}

export default function ResultCard({
	result,
	resultUnit,
	interpretResult,
}: ComponentProps) {
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
	useEffect(() => {
		if (isFirstRender) {
			setIsFirstRender(false)
			return
		}

		const resultCard = document.getElementById('resultCard')
		resultCard?.classList.add('animation')
		setTimeout(() => {
			resultCard?.classList.remove('animation')
		}, 300)
	}, [result])

	const resultInterpretation = interpretResult(result)

	if (Number.isNaN(result)) result = 0

	return (
		<Card overflow='hidden' variant='filled' id='resultCard'>
			<CardHeader>
				<Heading size='md'>
					Wynik: {result.toFixed(1).replace(/\.0$/, '')}
					{resultUnit && resultUnit}
				</Heading>
			</CardHeader>

			<Divider color='white' />

			<CardBody>
				<Text>{resultInterpretation}</Text>
			</CardBody>
		</Card>
	)
}
