import { Box, Flex, IconButton, Button } from '@chakra-ui/react'
import { IconHeart } from '@tabler/icons-react'
import ThemeButton from '../components/buttons/ThemeButton'
import SearchBox from '../components/modals/SearchBox/SearchBox'
import Logo from '../components/other/Logo'
import STRINGS from '../data/strings'
import { Link as RouterLink } from 'react-router-dom'
import ROUTES from '../data/routes'

export default function Navbar() {
  return (
    <Box
      p={4}
      borderBottomWidth='1px'
      position='sticky'
      top={0}
      zIndex={10}
      bg='white'
      _dark={{ bg: 'gray.800' }}>
      <Flex align='center' justify='space-between' gap={4} wrap='wrap'>
        <RouterLink to='/'>
          <Box height={{ base: 8, sm: 10 }}>
            <Logo width='100%' height='100%' />
          </Box>
        </RouterLink>

        <Flex align='center' gap={{ base: 3, md: 2 }} wrap='wrap'>
          <SearchBox />

          <Box display={{ base: 'none', md: 'initial' }}>
            <Button
              as={RouterLink}
              to={ROUTES.FAVORITES}
              leftIcon={<IconHeart stroke={1.5} />}
              aria-label={STRINGS.BUTTONS.FAVORITES.TITLE}>
              {STRINGS.BUTTONS.FAVORITES.TITLE}
            </Button>
          </Box>
          <Box display={{ base: 'initial', md: 'none' }}>
            <IconButton as={RouterLink} to={ROUTES.FAVORITES} aria-label={STRINGS.BUTTONS.FAVORITES.TITLE}>
              <IconHeart stroke={1.5} />
            </IconButton>
          </Box>

          <ThemeButton />
        </Flex>
      </Flex>
    </Box>
  )
}
