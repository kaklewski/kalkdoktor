import { Flex, IconButton, Link, Text, Tooltip } from '@chakra-ui/react'
import { IconBrandGithub, IconBrandLinkedin, IconWorld } from '@tabler/icons-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Flex p={4} direction='column' justify='center' align='center' borderTopWidth='1px'>
      <Text fontSize='xs'>
        &copy; {currentYear} Oskar Kąklewski - Opublikowano na licencji GPL 3.0
      </Text>
      <Flex>
        <Tooltip label='GitHub'>
          <Link href='https://github.com/kaklewski/kalkdoktor' isExternal>
            <IconButton aria-label='GitHub' variant='ghost' size='sm'>
              <IconBrandGithub size={20} stroke={1.8} />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip label='Portfolio'>
          <Link href='https://kaklewski.pl' isExternal>
            <IconButton aria-label='Portfolio' variant='ghost' size='sm'>
              <IconWorld size={20} stroke={1.8} />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip label='LinkedIn'>
          <Link href='https://www.linkedin.com/in/oskar-kaklewski' isExternal>
            <IconButton aria-label='LinkedIn' variant='ghost' size='sm'>
              <IconBrandLinkedin size={20} stroke={1.8} />
            </IconButton>
          </Link>
        </Tooltip>
      </Flex>
    </Flex>
  )
}
