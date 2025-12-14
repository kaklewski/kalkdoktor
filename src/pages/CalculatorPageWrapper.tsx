import { lazy } from 'react';

import { CalculatorType } from '../types/calculatorTypes';
const CalculatorPage = lazy(() => import('./CalculatorPage'));

type CalculatorPageProps = {
  calculator: CalculatorType;
};

// Wrapper for passing props to a lazily loaded CalculatorPage in App.tsx
export default function CalculatorPageWrapper({
  calculator,
}: CalculatorPageProps) {
  return <CalculatorPage calculator={calculator} />;
}
