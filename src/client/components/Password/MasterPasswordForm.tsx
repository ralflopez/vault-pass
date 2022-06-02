import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  generateAuthHash,
  generateEncryptionKey,
} from '../../helpers/encryption';
import { useAuthStore } from '../../store/auth';
import { usePasswordsStore } from '../../store/passwords';

export const MasterPasswordForm = () => {
  const [email, setEmail] = useState('demo@email.com');
  const [password, setPassword] = useState('password');
  const setEncryptionKey = useAuthStore((s) => s.setEncryptionKey);
  const setAuthHash = useAuthStore((s) => s.setAuthHash);
  const fetchPasswords = usePasswordsStore((s) => s.fetchPasswords);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const encryptionKey = generateEncryptionKey(`${email}${password}`);
    const authHash = generateAuthHash(`${email}|${password}`);

    setEncryptionKey(encryptionKey);
    setAuthHash(authHash);

    await fetchPasswords(authHash);
  };

  return (
    <Container
      maxW="container.lg"
      pt="14"
      display="flex"
      justifyContent="center"
    >
      <Image
        src="/images/gradient-mesh-bg.png"
        position="fixed"
        zIndex="hide"
        w="100%"
        h="100%"
        left="0"
        top="0"
        right="0"
        bottom="0"
      />
      <Box
        bg="white"
        border="2px"
        borderColor="purple.200"
        rounded="md"
        p="8"
        w="full"
        maxW="lg"
        mt="8"
      >
        <form onSubmit={handleSubmit}>
          <Heading as="h2" mb="4">
            Login
          </Heading>
          <FormControl mb="4">
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="email">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <FormHelperText>Enter your master password</FormHelperText>
          </FormControl>
          <Button
            mt="4"
            bg="purple.400"
            textColor="white"
            _active={{
              bg: 'purple.500',
            }}
            _hover={{
              bg: 'purple.500',
            }}
            mb="4"
            type="submit"
          >
            Log in
          </Button>
        </form>
      </Box>
    </Container>
  );
};
