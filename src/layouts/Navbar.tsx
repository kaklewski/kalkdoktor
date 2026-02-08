import { Box, Button, Flex, IconButton } from '@chakra-ui/react';
import { IconHeart } from '@tabler/icons-react';
import { Link as RouterLink } from 'react-router-dom';

import ColorModeButton from '../components/buttons/ColorModeButton';
import SearchCommandModal from '../components/modals/SearchCommandModal';
import Logo from '../components/other/Logo';
import ROUTES from '../data/routes';
import STRINGS from '../data/strings';

export default function Navbar() {
  return (
    <Box
      p={4}
      borderBottomWidth="1px"
      position="sticky"
      top={0}
      zIndex={10}
      bg="white"
      _dark={{ bg: 'gray.800' }}
    >
      <Flex align="center" justify="space-between" gap={4} wrap="wrap">
        <RouterLink to={ROUTES.HOME}>
          <Box height={{ base: 8, sm: 10 }}>
            <Logo
              width="100%"
              height="100%"
              aria-label={STRINGS.NAV.LOGO_ARIA}
            />
          </Box>
        </RouterLink>

        <Flex align="center" gap={{ base: 3, md: 2 }} wrap="wrap">
          <SearchCommandModal />

          <Box display={{ base: 'none', md: 'initial' }}>
            <Button
              as={RouterLink}
              to={ROUTES.FAVORITES}
              leftIcon={<IconHeart stroke={1.5} />}
              aria-label={STRINGS.BUTTONS.FAVORITES.TITLE}
            >
              {STRINGS.BUTTONS.FAVORITES.TITLE}
            </Button>
          </Box>
          <Box display={{ base: 'initial', md: 'none' }}>
            <IconButton
              as={RouterLink}
              to={ROUTES.FAVORITES}
              aria-label={STRINGS.BUTTONS.FAVORITES.TITLE}
            >
              <IconHeart stroke={1.5} />
            </IconButton>
          </Box>

          <ColorModeButton />
        </Flex>
      </Flex>
    </Box>
  );
}
