import { useEffect, useState } from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import FavButton from '../components/FavButton'
import ResultCard from '../components/ResultCard'
import DetailsCard from '../components/DetailsCard'
import FormCard from '../components/FormCard'
import { CalculatorType } from '../types/calculatorTypes'
import useDocumentTitle from '../hooks/useDocumentTitle'

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

  // Make sure that the interpretation is always provided when the result changes.
  useEffect(() => {
    setResultInterpretation(getResultInterpretation(result))
  }, [result])

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
        getResult={getResult}
        setResult={setResult}
        result={result}
        getResultInterpretation={getResultInterpretation}
        setResultInterpretation={setResultInterpretation}
      />

      <ResultCard
        result={result}
        resultUnit={resultUnit}
        resultInterpretation={resultInterpretation}
      />

      <DetailsCard
        description={description}
        sources={sources}
        methodology={methodology}
      />
    </>
  )
}
