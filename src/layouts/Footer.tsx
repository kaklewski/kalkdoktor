import { Flex, IconButton, Link, Text } from '@chakra-ui/react';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconWorld,
} from '@tabler/icons-react';
import { ReactNode } from 'react';

import ContactModal from '../components/modals/ContactModal';
import AppTooltip from '../components/other/AppTooltip';
import STRINGS from '../data/strings';

const Footer = () => (
  <FooterContainer>
    <CopyrightsText />
    <FooterLinks />
  </FooterContainer>
);

type FooterContainerProps = {
  children: ReactNode;
};

const FooterContainer = ({ children }: FooterContainerProps) => (
  <Flex
    as="footer"
    p={4}
    direction="column"
    justify="center"
    align="center"
    borderTopWidth="1px"
  >
    {children}
  </Flex>
);

const CopyrightsText = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Text fontSize="xs" textAlign="center">
      &copy; {currentYear} {STRINGS.LAYOUTS.FOOTER.TEXT}
    </Text>
  );
};

const FooterLinks = () => {
  const SOCIAL_LINKS = [
    {
      label: STRINGS.LAYOUTS.FOOTER.LINKS.GITHUB.TITLE,
      href: STRINGS.LAYOUTS.FOOTER.LINKS.GITHUB.URL,
      icon: IconBrandGithub,
    },
    {
      label: STRINGS.LAYOUTS.FOOTER.LINKS.PORTFOLIO.TITLE,
      href: STRINGS.LAYOUTS.FOOTER.LINKS.PORTFOLIO.URL,
      icon: IconWorld,
    },
    {
      label: STRINGS.LAYOUTS.FOOTER.LINKS.LINKEDIN.TITLE,
      href: STRINGS.LAYOUTS.FOOTER.LINKS.LINKEDIN.URL,
      icon: IconBrandLinkedin,
    },
  ];

  return (
    <Flex>
      {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
        <AppTooltip key={label} label={label}>
          <IconButton
            as={Link}
            href={href}
            isExternal
            aria-label={label}
            variant="ghost"
            size="sm"
          >
            <Icon size={20} stroke={1.8} />
          </IconButton>
        </AppTooltip>
      ))}

      <ContactModal />
    </Flex>
  );
};

export default Footer;
