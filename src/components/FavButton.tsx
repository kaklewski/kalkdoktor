import { IconButton, useToast } from '@chakra-ui/react'
import { useState } from 'react'

const pageId = window.location.pathname.slice(1)
const localStorageKey = 'favorites'

const addToFavIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='1.5'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
	</svg>
)

const removeFromFavIcon = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='currentColor'>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<path d='M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z' />
	</svg>
)

const isAlreadyFaved = (() => {
	const favString = localStorage.getItem(localStorageKey)
	if (favString === null) return false

	let favorites = JSON.parse(favString)
	if (!favorites.includes(pageId)) return false

	return true
})()

export default function FavButton() {
	const [isFav, setIsFav] = useState(isAlreadyFaved)
	const toast = useToast()

	function showToast(type: string) {
		toast({
			title:
				type === 'added'
					? 'Dodano do ulubionych.'
					: 'Usunięto z ulubionych.',
			status: type === 'added' ? 'success' : 'warning',
			position: 'top',
			duration: 1500,
			isClosable: true,
		})
	}

	function addToFav() {
		const favString = localStorage.getItem(localStorageKey)

		if (favString === null) {
			localStorage.setItem(localStorageKey, JSON.stringify([pageId]))
			return
		}

		let favorites = JSON.parse(favString)

		if (favorites.includes(pageId)) {
			const index = favorites.indexOf(pageId)
			const removedItem = favorites.splice(index, 1)
			showToast('removed')
			setIsFav(false)
		} else {
			favorites.push(pageId)
			favorites.sort()
			showToast('added')
			setIsFav(true)
		}

		localStorage.setItem(localStorageKey, JSON.stringify(favorites))
	}

	return (
		<IconButton
			aria-label={isFav ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
			variant='outline'
			colorScheme={isFav ? 'red' : 'teal'}
			icon={isFav ? removeFromFavIcon : addToFavIcon}
			onClick={addToFav}
		/>
	)
}
