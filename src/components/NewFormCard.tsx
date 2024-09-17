import {
	Button,
	Card,
	CardBody,
	Radio,
	Stack,
	StackDivider,
} from '@chakra-ui/react'
import { Form } from 'react-router-dom'
import CustomNumberInput from './CustomNumberInput'
import CustomCheckbox from './CustomCheckbox'
import CustomRadioGroup from './CustomRadioGroup'

interface Props {
	calculator: any // do zmiany
	setResult: any // do zmiany
}

export default function NewFormCard({ calculator, setResult }: Props) {
	const numberInputs = calculator?.fields.numberInputs
	const checkboxes = calculator?.fields.checkboxes
	const radioGroups = calculator?.fields.radioGroups

	// typ do zmiany
	const calculateResult = (event: any) =>
		calculator?.calculateResult(setResult, event)

	return (
		<Card overflow='hidden' variant='outline'>
			<Form onSubmit={calculateResult}>
				<CardBody>
					<Stack spacing={4} divider={<StackDivider />}>
						{/* typ do zmiany */}
						{numberInputs === null
							? ''
							: numberInputs.map((input: any) => (
									<CustomNumberInput
										key={input.id}
										id={input.id}
										text={input.text}
										min={input.min}
										max={input.max}
									/>
							  ))}
						{/* typ do zmiany */}
						{checkboxes === null
							? ''
							: checkboxes.map((checkbox: any) => (
									<CustomCheckbox
										key={checkbox.id}
										text={checkbox.text}
										value={checkbox.value}
									/>
							  ))}
						{/* typ do zmiany */}
						{radioGroups === null
							? ''
							: radioGroups.map((radioGroup: any) => (
									<CustomRadioGroup
										key={radioGroup.id}
										text={radioGroup.text}>
										{/* typ do zmiany */}
										{radioGroup.radios.map((radio: any) => (
											<Radio
												key={radio.id}
												value={radio.value.toString()}
												isRequired>
												{radio.text}
											</Radio>
										))}
									</CustomRadioGroup>
							  ))}

						<Button type='submit'>Oblicz</Button>
					</Stack>
				</CardBody>
			</Form>
		</Card>
	)
}
