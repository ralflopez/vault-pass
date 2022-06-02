import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { CopyIcon } from '@chakra-ui/icons';
import { useAuthStore } from '../../store/auth';
import { CreatePasswordModal } from './CreatePasswordModal';
import { usePasswordsStore } from '../../store/passwords';

export const PasswordDashboard = () => {
  const toast = useToast();
  const passwords = usePasswordsStore((s) => s.passwords);
  const decryptPassword = usePasswordsStore((s) => s.decryptPassword);
  const encryptionKey = useAuthStore((s) => s.encryptionKey);

  const copy = async (value: string) => {
    try {
      const data = await decryptPassword(value, encryptionKey);

      navigator.clipboard.writeText(data);
      toast({
        title: 'Copied to clipbord.',
        description: 'Your password was copied to to your clip board.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Encryption error.',
        description: 'There was an error decrypting the password.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  return (
    <Container pt="14" maxW="container.lg">
      <Heading as="h2" mt="4" mb="8">
        Your Passwords
        <CreatePasswordModal />
      </Heading>
      <Grid
        templateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        gridGap="4"
      >
        {passwords.map((d) => (
          <GridItem key={d.id}>
            <Flex
              bg="purple.100"
              rounded="md"
              p="4"
              alignItems="center"
              justifyContent="space-between"
              boxShadow="sm"
            >
              {d.domain}
              <Flex
                w="10"
                h="10"
                bg="purple.200"
                rounded="md"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                onClick={() => copy(d.value)}
              >
                <CopyIcon w="6" h="6" color="purple.400" />
              </Flex>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};
