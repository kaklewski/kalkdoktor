import { Card, CardBody, CardHeader, Divider, Heading, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CalculatorType } from '../../types/calculatorTypes'

type ResultCardProps = {
  result: number
  resultUnit: CalculatorType['resultUnit']
  resultInterpretation: string
}

export default function ResultCard({ result, resultUnit, resultInterpretation }: ResultCardProps) {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true)
  const [resultCardAnimation, setResultCardAnimation] = useState<boolean>(false)

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }

    setResultCardAnimation(true)

    setTimeout(() => {
      setResultCardAnimation(false)
    }, 300)
  }, [result, resultInterpretation])

  if (Number.isNaN(result)) result = 0

  return (
    <Card
      overflow='hidden'
      variant='filled'
      id='resultCard'
      className={resultCardAnimation ? 'animation' : ''}>
      <CardHeader>
        <Heading as='p' size='md'>
          Wynik: {result.toFixed(1).replace(/\.0$/, '')}
          {resultUnit && `${resultUnit === '%' || resultUnit === '‰' ? '' : ' '}${resultUnit}`}
        </Heading>
      </CardHeader>

      <Divider />

      <CardBody>
        <Text>{resultInterpretation}</Text>
      </CardBody>
    </Card>
  )
}
