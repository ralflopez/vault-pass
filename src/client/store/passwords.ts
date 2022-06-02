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
}));
