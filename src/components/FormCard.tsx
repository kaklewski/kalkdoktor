import { Button, Card, CardBody, Stack, StackDivider } from '@chakra-ui/react'
import { Form } from 'react-router-dom'
import CustomNumberInput from './CustomNumberInput'
import CustomCheckbox from './CustomCheckbox'
import CustomRadioGroup from './CustomRadioGroup'
import CustomRadio from './CustomRadio'
import { Dispatch, FormEvent, SetStateAction } from 'react'

interface ComponentProps {
	numberInputs:
		| {
				id: string | number
				text: string
				min: number
				max: number
		  }[]
		| null
	checkboxes:
		| {
				id: string | number
				value: number
				text: string
		  }[]
		| null
	radioGroups:
		| {
				id: string | number
				text: string
				radios: {
					id: string | number
					value: number
					text: string
				}[]
		  }[]
		| null
	calculateResult: (setResult: (value: number) => void) => void
	setResult: Dispatch<SetStateAction<number>>
}

export default function FormCard({
	numberInputs,
	checkboxes,
	radioGroups,
	calculateResult,
	setResult,
}: ComponentProps) {
	function getResult(event: FormEvent<HTMLFormElement>) {
		// Prevent the page from reloading when the form is submitted
		event.preventDefault()
		calculateResult(setResult)
	}

	return (
		<Card overflow='hidden' variant='outline'>
			<Form onSubmit={getResult}>
				<CardBody>
					<Stack spacing={4} divider={<StackDivider />}>
						{numberInputs === null
							? ''
							: numberInputs.map(input => (
									<CustomNumberInput
										key={input.id}
										id={input.id}
										text={input.text}
										min={input.min}
										max={input.max}
									/>
							  ))}

						{checkboxes === null
							? ''
							: checkboxes.map(checkbox => (
									<CustomCheckbox
										key={checkbox.id}
										text={checkbox.text}
										value={checkbox.value}
									/>
							  ))}

						{radioGroups === null
							? ''
							: radioGroups.map(radioGroup => (
									<CustomRadioGroup
										key={radioGroup.id}
										text={radioGroup.text}>
										{radioGroup.radios.map(radio => (
											<CustomRadio
												key={radio.id}
												value={radio.value.toString()}
												text={radio.text}
											/>
										))}
									</CustomRadioGroup>
							  ))}

						<Button
							type='submit'
							colorScheme='teal'
							variant='solid'
							w='fit-content'
							mx='auto'>
							Oblicz
						</Button>
					</Stack>
				</CardBody>
			</Form>
		</Card>
	)
}
