import create from 'zustand';
import { VaultRecordWithoutAuthHash } from '../../types/vault';
import axios from 'axios';

interface PasswordsStore {
  passwords: VaultRecordWithoutAuthHash[] | null;
  fetchPasswords: (authHash: string) => Promise<void>;
  createPassword: (
    authHash: string,
    encryptionKey: string,
    domain: string,
    value: string,
  ) => Promise<void>;
  decryptPassword: (value: string, encryptionKey: string) => Promise<string>;
}

const fetchPasswordsMethod = async (authHash: string) => {
  const { data } = await axios.get(`/api/vaults/${authHash}`);
  return data;
};

const createPasswordMethod = async (
  authHash: string,
  encryptionKey: string,
  domain: string,
  value: string,
) => {
  await axios.post(`/api/vaults`, {
    authHash,
    encryptionKey,
    domain,
    value,
  });
};

const decryptPasswordMethod = async (value: string, encryptionKey: string) => {
  const { data } = await axios.get('/api/crypto/decrypt', {
    params: {
      value,
      encryptionKey,
    },
  });

  return data;
};

export const usePasswordsStore = create<PasswordsStore>()((set) => ({
  passwords: null,
  fetchPasswords: async (authHash: string) =>
    set({ passwords: await fetchPasswordsMethod(authHash) }),
  createPassword: async (
    authHash: string,
    encryptionKey: string,
    domain: string,
    value: string,
  ) => await createPasswordMethod(authHash, encryptionKey, domain, value),
  decryptPassword: async (value: string, encryptionKey: string) =>
    await decryptPasswordMethod(value, encryptionKey),
}));
