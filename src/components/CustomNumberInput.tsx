import {
	Box,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Text,
} from '@chakra-ui/react'

interface Props {
	text: string
	min: number
	max: number
	id: string
}

export default function CustomNumberInput({ text, min, max, id }: Props) {
	return (
		<Box>
			<Text>{text}:</Text>
			<NumberInput min={min} max={max} id={id}>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
		</Box>
	)
}
