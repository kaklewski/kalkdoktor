import { Flex, Heading, Stack } from '@chakra-ui/react';
import { useState } from 'react';

import FavButton from '../components/buttons/FavButton';
import DetailsCard from '../components/cards/DetailsCard';
import FormCard from '../components/cards/FormCard';
import ResultCard from '../components/cards/ResultCard';
import BugReportModal from '../components/modals/BugReportModal';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { CalculatorType } from '../types/calculatorTypes';

type CalculatorPageProps = {
  calculator: CalculatorType;
};

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
  } = calculator;

  useDocumentTitle(name);

  const [result, setResult] = useState<number>(0);
  const [resultInterpretation, setResultInterpretation] = useState<string>(
    getResultInterpretation(result),
  );

  function displayResultAndInterpretation() {
    setResult(getResult());
    setResultInterpretation(getResultInterpretation(getResult()));
  }

  return (
    <>
      <Flex justify="space-between" gap={2}>
        <Heading as="h1">{name}</Heading>
        <FavButton pageId={id} />
      </Flex>

      <Stack spacing={4}>
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
      </Stack>

      <Flex justify="right">
        <BugReportModal calculatorName={name} />
      </Flex>
    </>
  );
}
