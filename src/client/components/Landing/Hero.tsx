import { Box, Button, Container, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export const HeroSection = () => {
  return (
    <Box as="section" id="hero" w="100%" position="relative">
      <Image
        src="/images/gradient-mesh-bg.png"
        position="absolute"
        zIndex="hide"
        w="100%"
        h="100%"
      />

      <Container maxW="container.lg">
        {/* // Hero */}
        <Flex
          flexDirection={{
            base: 'column',
            md: 'row',
          }}
          // bg="yellow.200"
          pt="14"
          h="100vh"
          minH="600px"
          maxH="2160px"
        >
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems={{
              base: 'center',
              md: 'start',
            }}
          >
            <Text
              fontWeight="bold"
              fontSize={{
                base: '4xl',
                sm: '5xl',
                lg: '6xl',
              }}
              mb="8"
              textAlign={{
                base: 'center',
                md: 'left',
              }}
            >
              Keep things easy and{' '}
              <Box
                as="span"
                display="inline-block"
                textAlign="left"
                w={{
                  base: '28',
                  sm: '40',
                  lg: '48',
                }}
              >
                secure
                <Image src="/images/hand-drawn-underline.svg" />
              </Box>
            </Text>
            <Button px="4" py="7" colorScheme="blackAlpha">
              Get Started
            </Button>
          </Box>
          <Box
            flex="1"
            position="relative"
            display={{
              base: 'none',
              md: 'block',
            }}
          >
            <Box
              top="10px"
              left="0"
              w="fit-content"
              // transform={`translate(-50%, 0)`}
              position="absolute"
            >
              <Image src="/images/hero.svg" />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
