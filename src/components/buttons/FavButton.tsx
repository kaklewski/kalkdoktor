import { IconButton, Tooltip, useToast } from '@chakra-ui/react'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { useState } from 'react'
import { CalculatorType } from '../../types/calculatorTypes'
import STRINGS from '../../data/strings'
import STORAGE_KEYS from '../../data/storageKeys'

type FavButtonProps = {
  pageId: CalculatorType['id']
}

export default function FavButton({ pageId }: FavButtonProps) {
  const [isFav, setIsFav] = useState<boolean>(() => {
    // Determine if the button should initially be displayed as added to favorites or not

    // If there is no string with favorites, return false
    const favString = localStorage.getItem(STORAGE_KEYS.FAVORITES)
    if (favString === null) return false

    // If the item is not in the string of fav in local storage, return false
    const favorites = JSON.parse(favString)
    if (!favorites.includes(pageId)) return false

    // Else return true
    return true
  })
  const toast = useToast()

  function showToast(type: string) {
    toast({
      title: type === 'added' ? STRINGS.TOASTS.FAVORITES.ADDED : STRINGS.TOASTS.FAVORITES.REMOVED,
      status: type === 'added' ? 'success' : 'warning',
      position: 'top',
      duration: 1500,
      isClosable: true,
    })
  }

  function addToFav() {
    // If there are no favorites, add the item
    let favString = localStorage.getItem(STORAGE_KEYS.FAVORITES)
    if (favString === null) {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([pageId]))
      favString = '[]'
    }

    const favorites = JSON.parse(favString)
    if (favorites.includes(pageId)) {
      // If the page is in the favorites, remove it
      const index = favorites.indexOf(pageId)
      favorites.splice(index, 1)
      showToast('removed')
      setIsFav(false)
    } else {
      // If the page is not in the favorites, add it
      favorites.push(pageId)
      favorites.sort()
      showToast('added')
      setIsFav(true)
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites))
  }

  return (
    <Tooltip
      label={
        isFav ? STRINGS.BUTTONS.FAVORITES.ACTION.REMOVE : STRINGS.BUTTONS.FAVORITES.ACTION.ADD
      }>
      <IconButton
        aria-label={
          isFav ? STRINGS.BUTTONS.FAVORITES.ACTION.REMOVE : STRINGS.BUTTONS.FAVORITES.ACTION.ADD
        }
        variant='outline'
        colorScheme={isFav ? 'red' : 'teal'}
        icon={isFav ? <IconHeartFilled stroke={1.5} /> : <IconHeart stroke={1.5} />}
        onClick={addToFav}
      />
    </Tooltip>
  )
}
