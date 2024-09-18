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
	interpretResult: (result: number) => string
}

export default function ResultCard({
	result,
	interpretResult,
}: ComponentProps) {
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
	const resultInterpretation = interpretResult(result)

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

	return (
		<Card overflow='hidden' variant='filled' id='resultCard'>
			<CardHeader>
				<Heading size='md'>Wynik: {result}</Heading>
			</CardHeader>

			<Divider color='white' />

			<CardBody>
				<Text>{resultInterpretation}</Text>
			</CardBody>
		</Card>
	)
}
