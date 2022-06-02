import create from 'zustand';

interface AuthStore {
  encryptionKey: string;
  authHash: string;
  setEncryptionKey: (value: string) => void;
  setAuthHash: (value: string) => void;
  deleteEncryptionKey: () => void;
  deleteAuthHash: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  encryptionKey: '',
  authHash: '',
  setEncryptionKey: (value: string) => set({ encryptionKey: value }),
  setAuthHash: (value: string) => set({ authHash: value }),
  deleteEncryptionKey: () => set({ encryptionKey: '' }),
  deleteAuthHash: () => set({ authHash: '' }),
}));
