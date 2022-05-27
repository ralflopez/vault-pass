import { Vault } from '@prisma/client';
import {
  encrypt,
  generateAuthHash,
  generateEncryptionKey,
} from '../../vaults/helpers/encryption';
import * as crypto from 'crypto';

export const vaultStubForUser1 = (domain: string, password: string): Vault => {
  const encryptionKey = generateEncryptionKey('demo@email.com', 'password');
  const authHash = generateAuthHash(encryptionKey);
  return {
    id: crypto.randomBytes(16).toString('hex'),
    authHash,
    domain,
    value: encrypt(password, Buffer.from(encryptionKey, 'hex')),
  };
};

export const vaultStubForUser2 = (domain: string, password: string): Vault => {
  const encryptionKey = generateEncryptionKey('demo2@email.com', 'password');
  const authHash = generateAuthHash(encryptionKey);
  return {
    id: crypto.randomBytes(16).toString('hex'),
    authHash,
    domain,
    value: encrypt(password, Buffer.from(encryptionKey, 'hex')),
  };
};
