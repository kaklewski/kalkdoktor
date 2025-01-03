import { calculators } from './calculators'
import { CalculatorType } from '../types/calculatorTypes'

export const sortedCalculators = calculators.sort(
  (calculator1: CalculatorType, calculator2: CalculatorType) => {
    const calculator1Name = calculator1.name.toLowerCase()
    const calculator2Name = calculator2.name.toLowerCase()
    if (calculator1Name < calculator2Name) return -1
    if (calculator1Name > calculator2Name) return 1
    return 0
  }
)
