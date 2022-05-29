import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Box,
  CloseButton,
  Container,
  Fade,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const NavLinks = [
  { name: 'Home', path: '/' },
  { name: 'Passwords', path: '/passwords' },
  { name: 'Account', path: '/account' },
];

const NavLink = ({
  children,
  path,
  isActive,
}: {
  children: ReactNode;
  path: string;
  isActive: boolean;
}) => {
  return (
    <NextLink href={path} passHref>
      <Link
        fontSize="md"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: 'purple.200',
        }}
        bg={isActive ? 'purple.100' : 'transparent'}
      >
        {children}
      </Link>
    </NextLink>
  );
};

const Navbar = () => {
  const router = useRouter();
  const navBg = useRef();
  const [isOpen, setOpen] = useState(false);
  const [scrolledToTop, setScrolledToTop] = useState(true);

  const toggleMenu = () => {
    setOpen((o) => !o);
  };

  const closeFromNavBg = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target !== navBg.current) return;
    toggleMenu();
  };

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) setScrolledToTop(true);
      else if (scrolledToTop) setScrolledToTop(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Flex
      bg={!scrolledToTop || isOpen ? 'white' : 'transparent'}
      position="fixed"
      zIndex="overlay"
      h="14"
      w="full"
      alignItems="center"
    >
      <Container maxW="container.lg">
        <Flex justifyContent="space-between" alignItems="center">
          <HStack>
            <Image src="/images/logo.png" h="8" />
            <Text fontWeight="bold" fontSize="md">
              VaultPass
            </Text>
          </HStack>
          <IconButton
            aria-label="Toggle menu"
            icon={isOpen ? <CloseButton /> : <HamburgerIcon />}
            onClick={toggleMenu}
            display={{ base: 'flex', md: 'none' }}
          />
          <Box position="fixed">
            <Fade in={isOpen}>
              <Box
                position="fixed"
                bg="blackAlpha.500"
                w="full"
                h="100vh"
                top="14"
                left="0"
                onClick={closeFromNavBg}
                ref={navBg}
                display={{
                  base: isOpen ? 'flex' : 'none',
                  md: 'none',
                }}
              >
                <VStack
                  overflow="auto"
                  bg="whitesmoke"
                  position="fixed"
                  right="0"
                  top="14"
                  bottom="0"
                  w={{
                    base: '100%',
                    sm: '50%',
                  }}
                  pt="8"
                  justifyContent="start"
                  // transform={isOpen ? '' : 'translateX(100%)'}
                >
                  {NavLinks.map((link) => (
                    <NavLink
                      isActive={router.pathname === link.path}
                      path={link.path}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </VStack>
              </Box>
            </Fade>
          </Box>
          <HStack
            display={{
              base: 'none',
              md: 'flex',
            }}
          >
            {NavLinks.map((link) => (
              <NavLink
                isActive={router.pathname === link.path}
                path={link.path}
              >
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
