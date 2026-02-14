import { Badge } from '@chakra-ui/react';

type AppBadgeProps = {
  value: number;
};

const AppBadge = ({ value }: AppBadgeProps) => {
  const plusSign = value > 0 ? '+' : '';

  return (
    <Badge>
      {plusSign}
      {value}
    </Badge>
  );
};

export default AppBadge;
