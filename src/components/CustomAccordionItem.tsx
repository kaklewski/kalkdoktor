import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
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
			<h2>
				<AccordionButton>
					<Box as='span' flex='1' textAlign='left'>
						{title[0].toUpperCase() + title.slice(1)}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel pb={4}>{children}</AccordionPanel>
		</AccordionItem>
	)
}
