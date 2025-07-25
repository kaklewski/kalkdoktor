import { Flex, IconButton, Link, Text, Tooltip } from '@chakra-ui/react';
import { IconBrandGithub, IconBrandLinkedin, IconWorld } from '@tabler/icons-react';

import ContactModal from '../components/modals/ContactModal';
import STRINGS from '../data/strings';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Flex p={4} direction="column" justify="center" align="center" borderTopWidth="1px">
      <Text fontSize="xs" textAlign="center">
        &copy; {currentYear} {STRINGS.LAYOUTS.FOOTER.TEXT}
      </Text>

      <Flex>
        <Tooltip label={STRINGS.LAYOUTS.FOOTER.LINKS.GITHUB.TITLE}>
          <Link href={STRINGS.LAYOUTS.FOOTER.LINKS.GITHUB.URL} isExternal>
            <IconButton
              aria-label={STRINGS.LAYOUTS.FOOTER.LINKS.GITHUB.TITLE}
              variant="ghost"
              size="sm"
            >
              <IconBrandGithub size={20} stroke={1.8} />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip label={STRINGS.LAYOUTS.FOOTER.LINKS.PORTFOLIO.TITLE}>
          <Link href={STRINGS.LAYOUTS.FOOTER.LINKS.PORTFOLIO.URL} isExternal>
            <IconButton
              aria-label={STRINGS.LAYOUTS.FOOTER.LINKS.PORTFOLIO.TITLE}
              variant="ghost"
              size="sm"
            >
              <IconWorld size={20} stroke={1.8} />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip label={STRINGS.LAYOUTS.FOOTER.LINKS.LINKEDIN.TITLE}>
          <Link href="https://www.linkedin.com/in/oskar-kaklewski" isExternal>
            <IconButton
              aria-label={STRINGS.LAYOUTS.FOOTER.LINKS.LINKEDIN.TITLE}
              variant="ghost"
              size="sm"
            >
              <IconBrandLinkedin size={20} stroke={1.8} />
            </IconButton>
          </Link>
        </Tooltip>

        <ContactModal />
      </Flex>
    </Flex>
  );
}
