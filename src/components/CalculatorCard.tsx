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
} from '@chakra-ui/react'
import FavButton from './FavButton'
import Calculator from '../types/calculatorInterface'

interface ComponentProps {
	id: Calculator['id']
	name: Calculator['name']
	link: Calculator['urlPath']
	description: Calculator['description']
}

export default function CalculatorCard({
	id,
	name,
	link,
	description,
}: ComponentProps) {
	return (
		<LinkBox>
			<Card
				size='sm'
				variant='outline'
				p={1}
				_hover={{
					borderColor: 'teal.400',
					transition: 'border-color 0.2s ease-in-out',
				}}>
				<CardHeader>
					<Flex gap={1}>
						<LinkOverlay href={link}>
							<Heading as='h3' size='md'>
								{name}
							</Heading>
						</LinkOverlay>
						<Spacer />
						<FavButton pageId={id} />
					</Flex>
				</CardHeader>

				<CardBody>
					<Text fontSize='sm'>{description}</Text>
				</CardBody>
			</Card>
		</LinkBox>
	)
}
