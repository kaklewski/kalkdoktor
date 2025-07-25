import { CalculatorType } from '../types/calculatorTypes';

export function getCategories(calculators: CalculatorType[]) {
  const categoriesArray: string[] = [];

  calculators.forEach((calculator) => {
    if (!categoriesArray.includes(calculator.category)) {
      categoriesArray.push(calculator.category);
    }
  });

  return categoriesArray.sort();
}
