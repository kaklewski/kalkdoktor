import { Flex, Heading, Stack } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import FavButton from '../components/buttons/FavButton';
import DetailsCard from '../components/cards/DetailsCard';
import FormCard from '../components/cards/FormCard';
import ResultCard from '../components/cards/ResultCard';
import BugReportModal from '../components/modals/BugReportModal';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { CalculatorModel } from '../types/calculatorModels';

type CalculatorPageProps = {
    calculator: CalculatorModel;
};

const CalculatorPage = ({ calculator }: CalculatorPageProps) => {
    const {
        id,
        name,
        sources,
        description,
        methodology,
        form,
        calculateResult,
    } = calculator;

    useDocumentTitle(name);

    const [submittedValues, setSubmittedValues] = useState({});
    const formMethods = useForm();
    const ResultCardRef = useRef<HTMLDivElement | null>(null);

    const getResultAndInterpretation = (obj: Record<string, string>) => {
        if (Object.keys(obj).length === 0) {
            return [null, null];
        }
        return calculateResult(obj);
    };

    const [result, interpretation] =
        getResultAndInterpretation(submittedValues);

    const handleCalculate = (values: Record<string, string>) => {
        setSubmittedValues(values);

        ResultCardRef?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <Stack spacing={8}>
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
                    ref={ResultCardRef}
                    result={result}
                    interpretation={interpretation}
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
        </Stack>
    );
};

export default CalculatorPage;
