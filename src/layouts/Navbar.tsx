import { Box, Button, Flex, Hide, IconButton, Show } from '@chakra-ui/react';
import { IconHeart } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ColorModeButton from '../components/buttons/ColorModeButton';
import SearchCommandModal from '../components/modals/SearchCommandModal';
import AppTooltip from '../components/other/AppTooltip';
import Logo from '../components/other/Logo';
import ROUTES from '../data/routes';
import STRINGS from '../data/strings';

const Navbar = () => (
  <NavbarContainer>
    <Flex alignItems="center" justify="space-between" gap={4} wrap="wrap">
      <Hide above="md">
        <AppTooltip label={STRINGS.NAV.LINKS.HOMEPAGE}>
          <Box
            as={RouterLink}
            to={ROUTES.HOME}
            aria-label={STRINGS.NAV.LINKS.HOMEPAGE}
            h={{ base: 8, lg: 10 }}
          >
            <Logo />
          </Box>
        </AppTooltip>
      </Hide>

      <Show above="md">
        <AppTooltip label={STRINGS.NAV.LINKS.HOMEPAGE}>
          <Button
            as={RouterLink}
            to={ROUTES.HOME}
            aria-label={STRINGS.NAV.LINKS.HOMEPAGE}
            variant="ghost"
            p={1}
            size="lg"
          >
            <Logo />
          </Button>
        </AppTooltip>
      </Show>

      <Flex alignItems="center" gap={{ base: 3, md: 2 }} wrap="wrap">
        <SearchCommandModal />

        <Hide above="md">
          <AppTooltip label={STRINGS.BUTTONS.FAVORITES.TITLE}>
            <IconButton
              as={RouterLink}
              to={ROUTES.FAVORITES}
              aria-label={STRINGS.BUTTONS.FAVORITES.TITLE}
              icon={<IconHeart stroke={1.5} />}
            />
          </AppTooltip>
        </Hide>

        <Show above="md">
          <Button
            as={RouterLink}
            to={ROUTES.FAVORITES}
            aria-label={STRINGS.BUTTONS.FAVORITES.TITLE}
            leftIcon={<IconHeart stroke={1.5} />}
          >
            {STRINGS.BUTTONS.FAVORITES.TITLE}
          </Button>
        </Show>

        <ColorModeButton />
      </Flex>
    </Flex>
  </NavbarContainer>
);

type NavbarContainerProps = {
  children: ReactNode;
};

const NavbarContainer = ({ children }: NavbarContainerProps) => (
  <Box
    as="header"
    p={4}
    borderBottomWidth="1px"
    position="sticky"
    top={0}
    zIndex={10}
    bg="white"
    _dark={{ bg: 'gray.800' }}
  >
    {children}
  </Box>
);

export default Navbar;
