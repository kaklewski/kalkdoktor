import { Button, Card, CardBody, Stack, StackDivider } from '@chakra-ui/react'
import { Form } from 'react-router-dom'
import CustomNumberInput from './CustomNumberInput'
import CustomCheckbox from './CustomCheckbox'
import CustomRadioGroup from './CustomRadioGroup'
import CustomRadio from './CustomRadio'
import { Dispatch, FormEvent, SetStateAction } from 'react'
import Calculator from '../types/calculatorInterface'

interface ComponentProps {
	numberInputs?: Calculator['fields']['numberInputs']
	checkboxes?: Calculator['fields']['checkboxes']
	radioGroups?: Calculator['fields']['radioGroups']
	getResult: Calculator['getResult']
	setResult: Dispatch<SetStateAction<number>>
	result: number
	getResultInterpretation: Calculator['getResultInterpretation']
	setResultInterpretation: Dispatch<SetStateAction<string>>
}

export default function FormCard({
	numberInputs,
	checkboxes,
	radioGroups,
	getResult,
	setResult,
	result,
	getResultInterpretation,
	setResultInterpretation,
}: ComponentProps) {
	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setResult(getResult())
		// Make sure that the interpretation changes even when the result doesn't.
		setResultInterpretation(getResultInterpretation(result))
	}

	return (
		<Card overflow='hidden' variant='outline'>
			<Form onSubmit={handleFormSubmit}>
				<CardBody>
					<Stack spacing={4} divider={<StackDivider />}>
						{radioGroups &&
							radioGroups.map(radioGroup => (
								<CustomRadioGroup
									key={radioGroup.id}
									id={radioGroup.id}
									text={radioGroup.text}>
									{radioGroup.radios.map(radio => (
										<CustomRadio
											key={radio.id}
											id={radio.id}
											value={radio.value}
											hideBadge={radio.hideBadge}
											text={radio.text}
										/>
									))}
								</CustomRadioGroup>
							))}

						{checkboxes &&
							checkboxes.map(checkbox => (
								<CustomCheckbox
									key={checkbox.id}
									id={checkbox.id}
									text={checkbox.text}
									value={checkbox.value}
								/>
							))}

						{numberInputs &&
							numberInputs.map(input => (
								<CustomNumberInput
									key={input.id}
									id={input.id}
									text={input.text}
									min={input.min}
									max={input.max}
								/>
							))}

						<Button
							type='submit'
							colorScheme='teal'
							w='fit-content'
							mx='auto'
							_focus={{
								borderColor: 'teal',
								boxShadow: '0 0 0 3px teal',
							}}>
							Oblicz
						</Button>
					</Stack>
				</CardBody>
			</Form>
		</Card>
	)
}
