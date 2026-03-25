import { Box, Flex } from '@chakra-ui/react';
import { ComponentProps } from 'react';

type ResponsiveButtonGroupProps = ComponentProps<typeof Box>;

const ResponsiveButtonGroup = ({
    children,
    ...rest
}: ResponsiveButtonGroupProps) => (
    <Box {...rest}>
        <Flex
            direction={{ base: 'column-reverse', md: 'row' }}
            justify={{ md: 'center' }}
            gap={2}
        >
            {children}
        </Flex>
    </Box>
);

export default ResponsiveButtonGroup;
