import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Heading,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface ComponentProps {
	title: string
	children: ReactNode
}

export default function CustomAccordionItem({
	title,
	children,
}: ComponentProps) {
	return (
		<AccordionItem>
			<AccordionButton>
				<Box as='span' flex='1' textAlign='left' py={2}>
					<Heading as='h2' size='md'>
						{title[0].toUpperCase() + title.slice(1)}
					</Heading>
				</Box>
				<AccordionIcon  />
			</AccordionButton>

			<AccordionPanel pb={4}>{children}</AccordionPanel>
		</AccordionItem>
	)
}
