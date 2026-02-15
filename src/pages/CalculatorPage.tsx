import { Flex, Heading, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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

const CalculatorPage = ({ calculator }: CalculatorPageProps) => {
  const {
    id,
    name,
    form,
    calculateResult,
    resultUnit,
    sources,
    description,
    methodology,
  } = calculator;

  useDocumentTitle(name);

  const [submittedValues, setSubmittedValues] = useState({});
  const formMethods = useForm();

  const [result, interpretation] = calculateResult(submittedValues);

  const handleCalculate = (values: any) => {
    setSubmittedValues(values);
  };

  return (
    <>
      <Flex justify="space-between" gap={2}>
        <Heading as="h1">{name}</Heading>
        <FavButton calculatorId={id} />
      </Flex>

      <Stack spacing={4}>
        <FormCard
          form={form}
          formMethods={formMethods}
          onSubmit={handleCalculate}
        />

        <ResultCard
          result={result}
          resultUnit={resultUnit}
          resultInterpretation={interpretation}
        />

        <DetailsCard
          description={description}
          sources={sources}
          methodology={methodology}
        />
      </Stack>

      <Flex justify="right">
        <BugReportModal calculatorName={name} />
      </Flex>
    </>
  );
};

export default CalculatorPage;
