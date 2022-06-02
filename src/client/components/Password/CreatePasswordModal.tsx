import React, { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { generateRandomPassword } from '../../helpers/password';
import { usePasswordsStore } from '../../store/passwords';
import { useAuthStore } from '../../store/auth';

export const CreatePasswordModal = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createPassword = usePasswordsStore((s) => s.createPassword);
  const authHash = useAuthStore((s) => s.authHash);
  const encryptionKey = useAuthStore((s) => s.encryptionKey);
  const fetchPassword = usePasswordsStore((s) => s.fetchPasswords);

  const [isLoading, setLoading] = useState(false);
  const [domain, setDomain] = useState('');
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const password = generateRandomPassword();
    setPassword(password);
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authHash || !encryptionKey || !domain || !password) {
      toast({
        title: 'Input error.',
        description: 'Double check your input.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
      return;
    }

    try {
      console.log(domain);
      let d = new URL(domain);
      let extractedDomain = d.hostname.replace('www.', '');

      setLoading(true);
      await createPassword(authHash, encryptionKey, extractedDomain, password);
      await fetchPassword(authHash);

      toast({
        title: 'Password Added.',
        description: `New password added for ${extractedDomain}.`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
    } catch (error) {
      toast({
        title: 'Error Adding Password.',
        description: `There was an error adding a new password.`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
      onClose();
      setDomain('');
      setPassword('');
    }
  };

  return (
    <>
      <Button onClick={onOpen} ml={{ sm: '4' }} boxShadow="sm">
        Add Password
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mb="4">
                <FormLabel htmlFor="domain">Domain</FormLabel>
                <Input
                  id="domain"
                  type="text"
                  value={domain}
                  onChange={handleDomainChange}
                />
                <FormHelperText>Example: https://www.amazon.com</FormHelperText>
              </FormControl>
              <FormControl mb="4">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Flex>
                  <Input
                    id="password"
                    type="text"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <Button onClick={generatePassword} px="8" ml="2">
                    Auto Generate
                  </Button>
                </Flex>
                <FormHelperText>
                  We wont save this to the database in it's raw form
                </FormHelperText>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={handleSubmit}>
              {isLoading ? <Spinner color="purple.200" /> : 'Submit'}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
