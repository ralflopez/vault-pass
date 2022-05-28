import { Vault } from '@prisma/client';
import { encrypt } from '../../vaults/helpers/encryption';
import * as crypto from 'crypto';

export const vaultStub = (
  encryptionKey: string,
  authHash: string,
  domain: string,
  password: string,
): Vault => {
  return {
    id: crypto.randomBytes(16).toString('hex'),
    authHash,
    domain,
    value: encrypt(password, Buffer.from(encryptionKey, 'hex')),
  };
};
