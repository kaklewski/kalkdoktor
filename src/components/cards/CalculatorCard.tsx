import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import FavButton from '../buttons/FavButton';

type CalculatorCardProps = {
  id: number;
  name: string;
  link: string;
  description: string;
};

const CalculatorCard = ({
  id,
  name,
  link,
  description,
}: CalculatorCardProps) => (
  <Card
    as={RouterLink}
    to={link}
    size="sm"
    variant="outline"
    p={1}
    rounded="lg"
    cursor="pointer"
    transition="all 0.15s"
    _hover={{
      borderColor: 'teal.500',
      transform: 'translateY(-2px)',
      shadow: 'sm',
      textDecoration: 'none',
    }}
    _focusVisible={{
      outline: '3px solid',
      outlineColor: 'teal.400',
    }}
    _dark={{
      _hover: {
        borderColor: 'teal.200',
      },
      _focusVisible: {
        outlineColor: 'teal.200',
      },
    }}
  >
    <CardHeader>
      <Flex gap={1} align="center">
        <Heading as="h3" size="md">
          {name}
        </Heading>

        <Spacer />

        <FavButton calculatorId={id} />
      </Flex>
    </CardHeader>

    <CardBody>
      <Text fontSize="sm">{description}</Text>
    </CardBody>
  </Card>
);

export default CalculatorCard;
