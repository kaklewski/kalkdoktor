// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Flex,
//   Heading,
//   LinkBox,
//   LinkOverlay,
//   Spacer,
//   Text,
// } from '@chakra-ui/react';
// import { Link as RouterLink } from 'react-router-dom';

// import { CalculatorType } from '../../types/calculatorTypes';
// import FavButton from '../buttons/FavButton';

// type CalculatorCardProps = {
//   id: CalculatorType['id'];
//   name: CalculatorType['name'];
//   link: CalculatorType['urlPath'];
//   description: CalculatorType['description'];
// };

// const CalculatorCard = ({
//   id,
//   name,
//   link,
//   description,
// }: CalculatorCardProps) => {
//   return (
//     <LinkBox as="article">
//       <Card
//         size="sm"
//         variant="outline"
//         p={1}
//         rounded="xl"
//         transition="border-color 0.1s ease-in-out"
//         _hover={{
//           borderColor: 'teal.500',
//         }}
//         _active={{
//           borderColor: 'teal.500',
//         }}
//         _dark={{
//           _hover: {
//             borderColor: 'teal.200',
//           },
//           _active: {
//             borderColor: 'teal.200',
//           },
//         }}
//       >
//         <CardHeader>
//           <Flex gap={1}>
//             <LinkOverlay as={RouterLink} to={link}>
//               <Heading as="h3" size="md">
//                 {name}
//               </Heading>
//             </LinkOverlay>
//             <Spacer />
//             <FavButton calculatorId={id} />
//           </Flex>
//         </CardHeader>

//         <CardBody>
//           <Text fontSize="sm">{description}</Text>
//         </CardBody>
//       </Card>
//     </LinkBox>
//   );
// };

// export default CalculatorCard;

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
    rounded="xl"
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
