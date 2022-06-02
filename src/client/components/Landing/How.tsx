import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export const HowSection = () => {
  return (
    <>
      <Heading as="h3" mb="8">
        <Box display="inline" color="purple.400">
          How
        </Box>{' '}
        do I know it's secure?
      </Heading>
      <Grid
        templateColumns={{
          md: 'repeat(2, 1fr)',
        }}
        templateRows={{
          md: 'repeat(3, 1fr)',
        }}
        gap="3"
      >
        <GridItem
          colSpan={{ md: 1 }}
          colStart={{ md: 1 }}
          display="flex"
          alignItems="center"
          mb="4"
        >
          <Text>
            VaultPass is based on{' '}
            <Link color="purple.400">LastPass' Security Architecture.</Link> We
            are using hashing and encryption algorithms to make sure no one, not
            even us would be able to read your data.
          </Text>
        </GridItem>
        <GridItem
          colSpan={{ md: 1 }}
          colStart={{ md: 1 }}
          rowStart={{ md: 2 }}
          mb="4"
        >
          <Heading as="h6" mb="8" fontSize="lg">
            PBKDF2-SHA256
          </Heading>
          <Text>
            We hash your credentials before sending it to the database so
            hackers will be forced to slow down their guesses.
          </Text>
        </GridItem>
        <GridItem
          colSpan={{ md: 1 }}
          colStart={{ md: 1 }}
          rowStart={{ md: 3 }}
          mb="4"
        >
          <Heading as="h6" mb="8" fontSize="lg">
            256-bit AES encryption
          </Heading>
          <Text>
            We use AES encryption to encrypt your data in our system similar to
            how the military use it
          </Text>
        </GridItem>
        <GridItem
          colSpan={{ md: 1 }}
          colStart={{ md: 2 }}
          rowSpan={{ md: 3 }}
          order={{ base: -1, md: 1 }}
          mb="4"
          display="flex"
          justifyContent="center"
        >
          <Image
            src="https://www.lastpass.com/-/media/3acc25eb789a4c06aed3dba19e93b971.svg?la=en&hash=518C3A85BA39B4B837D84B8457B8BD6C"
            alt="last pass architecture"
          />
        </GridItem>
      </Grid>
    </>
  );
};
