import { Card, CardBody, CardHeader, Divider, Heading, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { CalculatorType } from '../../types/calculatorTypes'

type ResultCardProps = {
  result: number
  resultUnit: CalculatorType['resultUnit']
  resultInterpretation: string
}

export default function ResultCard({
  result = 0,
  resultUnit,
  resultInterpretation,
}: ResultCardProps) {
  const isFirstRender = useRef(true)
  const [resultCardAnimation, setResultCardAnimation] = useState<boolean>(false)

  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false
      return
    }

    setResultCardAnimation(true)

    const timeout = setTimeout(() => {
      setResultCardAnimation(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [result])

  const formattedResult = result.toFixed(1).replace(/\.0$/, '')
  const formattedResultUnit =
    resultUnit && `${resultUnit === '%' || resultUnit === '‰' ? '' : ' '}${resultUnit}`

  return (
    <Card
      overflow='hidden'
      variant='filled'
      id='resultCard'
      className={resultCardAnimation ? 'animation' : ''}>
      <CardHeader>
        <Heading as='p' size='md'>
          Wynik: {formattedResult}
          {formattedResultUnit}
        </Heading>
      </CardHeader>

      <Divider />

      <CardBody>
        <Text>{resultInterpretation}</Text>
      </CardBody>
    </Card>
  )
}
