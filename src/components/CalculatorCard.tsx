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

interface ComponentProps {
	id: number
	name: string
	link: string
	description: string
}

export default function CalculatorCard({
	id,
	name,
	link,
	description,
}: ComponentProps) {
	return (
		<LinkBox>
			<Card size='sm' variant='outline' p={1}>
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
