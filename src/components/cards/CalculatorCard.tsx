import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { CalculatorType } from '../../types/calculatorTypes';
import FavButton from '../buttons/FavButton';

type CalculatorCardProps = {
  id: CalculatorType['id'];
  name: CalculatorType['name'];
  link: CalculatorType['urlPath'];
  description: CalculatorType['description'];
};

export default function CalculatorCard({ id, name, link, description }: CalculatorCardProps) {
  return (
    <LinkBox>
      <Card
        size="sm"
        variant="outline"
        p={1}
        _hover={{
          borderColor: 'teal.500',
          transition: 'border-color 0.2s ease-in-out',
        }}
        _active={{
          borderColor: 'teal.500',
          transition: 'border-color 0.2s ease-in-out',
        }}
        _dark={{
          _hover: {
            borderColor: 'teal.200',
          },
          _active: {
            borderColor: 'teal.200',
          },
        }}
      >
        <CardHeader>
          <Flex gap={1}>
            <LinkOverlay as={RouterLink} to={link}>
              <Heading as="h3" size="md">
                {name}
              </Heading>
            </LinkOverlay>
            <Spacer />
            <FavButton pageId={id} />
          </Flex>
        </CardHeader>

        <CardBody>
          <Text fontSize="sm">{description}</Text>
        </CardBody>
      </Card>
    </LinkBox>
  );
}
