import {
	Button,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from '@chakra-ui/react'
import { IconBackspaceFilled, IconSearch } from '@tabler/icons-react'

interface ComponentProps {
	searchBarRef: any
	searchQuery: string
	setSearchQuery: (value: string) => void
	focusOnSearchBar: () => void
}

export default function SearchBar({
	searchBarRef,
	searchQuery,
	setSearchQuery,
	focusOnSearchBar,
}: ComponentProps) {
	return (
		<InputGroup>
			<InputLeftElement pointerEvents='none'>
				<IconSearch stroke={1.5} />
			</InputLeftElement>

			<Input
				variant='filled'
				placeholder='Wyszukaj kalkulator'
				ref={searchBarRef}
				value={searchQuery}
				onChange={event => setSearchQuery(event.target.value)}
			/>

			{searchQuery && (
				<InputRightElement>
					<Button
						variant='ghost'
						size='sm'
						p={0}
						onClick={() => {
							setSearchQuery('')
							focusOnSearchBar()
						}}
						aria-label='Wyczyść tekst'>
						<IconBackspaceFilled stroke={1.5} />
					</Button>
				</InputRightElement>
			)}
		</InputGroup>
	)
}
