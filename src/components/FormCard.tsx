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
	calculateResult: Calculator['calculateResult']
	setResult: Dispatch<SetStateAction<number>>
	result: number
	getResultInterpretation: any
	setResultInterpretation: Dispatch<SetStateAction<string>>
}

export default function FormCard({
	numberInputs,
	checkboxes,
	radioGroups,
	calculateResult,
	setResult,
	result,
	getResultInterpretation,
	setResultInterpretation,
}: ComponentProps) {
	return (
		<Card overflow='hidden' variant='outline'>
			<Form
				onSubmit={(event: FormEvent<HTMLFormElement>) => {
					event.preventDefault()
					calculateResult(setResult)
					setResultInterpretation(getResultInterpretation(result))
				}}>
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
