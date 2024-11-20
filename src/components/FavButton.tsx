import { IconButton, Tooltip, useToast } from '@chakra-ui/react'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { useState } from 'react'
import Calculator from '../types/calculatorTypes'

interface ComponentProps {
  pageId: Calculator['id']
}

export default function FavButton({ pageId }: ComponentProps) {
  const LOCAL_STORAGE_KEY: string = 'favorites'
  const [isFav, setIsFav] = useState<boolean>(() => {
    // Determine if the button should initially be displayed as added to favorites or not

    // If there is no string with favorites, return false
    const favString = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (favString === null) return false

    // If the item is not in the string of fav in local storage, return false
    let favorites = JSON.parse(favString)
    if (!favorites.includes(pageId)) return false

    // Else return true
    return true
  })
  const toast = useToast()

  function showToast(type: string) {
    toast({
      title:
        type === 'added' ? 'Dodano do ulubionych.' : 'Usunięto z ulubionych.',
      status: type === 'added' ? 'success' : 'warning',
      position: 'top',
      duration: 1500,
      isClosable: true,
    })
  }

  function addToFav() {
    // If there are no favorites, add the page
    let favString = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (favString === null) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([pageId]))
      favString = '[]'
    }

    const favorites = JSON.parse(favString)
    if (favorites.includes(pageId)) {
      // If the page is in the favorites, remove it
      const index = favorites.indexOf(pageId)
      const removedItem = favorites.splice(index, 1)
      showToast('removed')
      setIsFav(false)
      if (removedItem) console.info() // This is only to make TypeScript warning shut up
    } else {
      // If the page is not in the favorites, add it
      favorites.push(pageId)
      favorites.sort((a: number, b: number) => a - b)
      showToast('added')
      setIsFav(true)
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites))
  }

  return (
    <Tooltip label={`${isFav === true ? 'Usuń z' : 'Dodaj do'} ulubionych`}>
      <IconButton
        aria-label={isFav ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        variant='outline'
        colorScheme={isFav ? 'red' : 'teal'}
        icon={
          isFav ? <IconHeartFilled stroke={1.5} /> : <IconHeart stroke={1.5} />
        }
        onClick={addToFav}
      />
    </Tooltip>
  )
}
