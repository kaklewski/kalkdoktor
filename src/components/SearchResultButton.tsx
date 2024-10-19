import { Button, Flex } from '@chakra-ui/react'
import { IconCornerDownLeft } from '@tabler/icons-react'
import Calculator from '../types/calculatorInterface'

interface ComponentProps {
	link: Calculator['urlPath']
	name: Calculator['name']
	isSelected: boolean
	selectedItemRef: any
	setSelectedItem: any
	index: number
}

export default function SearchResultButton({
	link,
	name,
	isSelected,
	selectedItemRef,
	setSelectedItem,
	index,
}: ComponentProps) {
	return (
		<Button
			onMouseMove={() => {
				setSelectedItem(index)
			}}
			as='a'
			href={link}
			height='auto'
			p={4}
			fontSize='md'
			colorScheme={isSelected === true ? 'teal' : 'gray'}
			style={{
				whiteSpace: 'normal',
				wordWrap: 'break-word',
				textAlign: 'left',
				display: 'flex',
				justifyContent: 'start',
				fontWeight: 'normal',
			}}
			ref={selectedItemRef !== false ? selectedItemRef : null}
			onFocus={() => setSelectedItem(index)}>
			<Flex
				justifyContent='space-between'
				alignItems='stretch'
				gap={2}
				w='100%'>
				{name}
				<Flex justifyContent='center' alignItems='center'>
					<IconCornerDownLeft
						stroke={1.5}
						size={20}
						style={{
							opacity: '50%',
						}}
					/>
				</Flex>
			</Flex>
		</Button>
	)
}
