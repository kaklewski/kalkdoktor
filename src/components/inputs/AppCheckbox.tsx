import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { CheckboxType } from '../../types/calculatorTypes';
import AppBadge from './AppBadge';

type AppCheckboxProps = CheckboxType & {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onBlur?: () => void;
};

const AppCheckbox = forwardRef<HTMLInputElement, AppCheckboxProps>(
  (
    {
      name,
      label,
      hideBadge,
      value: badgeValue,
      checked = false,
      onChange,
      onBlur,
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    return (
      <Box>
        <Checkbox
          ref={ref}
          name={name}
          isChecked={checked}
          onChange={handleChange}
          onBlur={onBlur}
          colorScheme="teal"
          w="100%"
        >
          <Flex align="center" gap={2}>
            <Text whiteSpace="pre-line">{label}</Text>

            {!hideBadge && typeof badgeValue === 'number' && (
              <AppBadge value={badgeValue} />
            )}
          </Flex>
        </Checkbox>
      </Box>
    );
  },
);

AppCheckbox.displayName = 'AppCheckbox';

export default AppCheckbox;
