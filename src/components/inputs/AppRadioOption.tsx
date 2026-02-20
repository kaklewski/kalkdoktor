import { Radio, Text } from '@chakra-ui/react';

import { RadioType } from '../../types/calculatorTypes';
import AppBadge from './AppBadge';

type AppRadioInputProps = RadioType;

const AppRadioOption = ({ value, label, hideBadge }: AppRadioInputProps) => {
  const isBadgeVisible = !hideBadge && typeof value === 'number';

  return (
    <Radio value={value.toString()} isRequired>
      <Text as="span" mr={isBadgeVisible ? 2 : 0} whiteSpace="pre-line">
        {label}
      </Text>
      {isBadgeVisible && <AppBadge value={value} />}
    </Radio>
  );
};

export default AppRadioOption;
