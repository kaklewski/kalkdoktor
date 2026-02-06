import { Tooltip } from '@chakra-ui/react';
import { ReactNode } from 'react';

type AppTooltipProps = {
  label: string;
  children: ReactNode;
};

const AppTooltip = ({ children, label }: AppTooltipProps) => (
  <Tooltip label={label} hasArrow arrowSize={8}>
    {children}
  </Tooltip>
);

export default AppTooltip;
