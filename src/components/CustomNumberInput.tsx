import {
	Box,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Text,
} from '@chakra-ui/react'

interface ComponentProps {
	id: string | number
	text: string
	min: number
	max: number
}

export default function CustomNumberInput({
	id,
	text,
	min,
	max,
}: ComponentProps) {
	return (
		<Box>
			<Text mb={2}>{text}:</Text>
			<NumberInput min={min} max={max} id={id.toString()} isRequired>
				<NumberInputField placeholder='Podaj wartość' />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
		</Box>
	)
}
