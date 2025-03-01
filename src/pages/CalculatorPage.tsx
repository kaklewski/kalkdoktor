import { useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import FavButton from '../components/Buttons/FavButton'
import { CalculatorType } from '../types/calculatorTypes'
import useDocumentTitle from '../hooks/useDocumentTitle'
import FormCard from '../components/Cards/FormCard'
import ResultCard from '../components/Cards/ResultCard'
import DetailsCard from '../components/Cards/DetailsCard'
import BugReportModal from '../components/Modals/BugReportModal'

type CalculatorPageProps = {
  calculator: CalculatorType
}

export default function CalculatorPage({ calculator }: CalculatorPageProps) {
  const {
    id,
    name,
    fields,
    getResult,
    resultUnit,
    getResultInterpretation,
    sources,
    description,
    methodology,
  } = calculator

  useDocumentTitle(name)

  const [result, setResult] = useState<number>(0)
  const [resultInterpretation, setResultInterpretation] = useState<string>(
    getResultInterpretation(result)
  )

  function displayResultAndInterpretation() {
    setResult(getResult())
    setResultInterpretation(getResultInterpretation(getResult()))
  }

  return (
    <>
      <Flex justify='space-between' gap={2}>
        <Heading as='h1'>{name}</Heading>
        <FavButton pageId={id} />
      </Flex>

      <FormCard
        numberInputs={fields.numberInputs}
        checkboxes={fields.checkboxes}
        radioGroups={fields.radioGroups}
        displayResultAndInterpretation={displayResultAndInterpretation}
      />

      <ResultCard
        result={result}
        resultUnit={resultUnit}
        resultInterpretation={resultInterpretation}
      />

      <DetailsCard description={description} sources={sources} methodology={methodology} />

      <Flex justify='right'>
        <BugReportModal />
      </Flex>
    </>
  )
}
