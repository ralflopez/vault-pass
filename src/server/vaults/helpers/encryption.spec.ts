import {
  decrypt,
  encrypt,
  generateAuthHash,
  generateEncryptionKey,
} from './encryption';
import { isMd5 } from './isMd5';

describe('Encryption Module', () => {
  it('should encrypt a value', () => {
    const result = encrypt(
      'twitterPassword',
      Buffer.from(
        '02f8cc9b1b7ac6a70cae312778b7fe12a550c01bd95ac73dbf234958aeb90080',
        'hex',
      ),
    );
    expect(result.includes('.')).toBeTruthy();
    expect(result.length).toBe(32 * 2 + 1);
  });

  it('should decrypt a value', () => {
    const passwordEncrypted =
      '33a93d689f8da932a972a6522fa998b0.920f6c02249f867ae5bd330009b2a65f';
    const encryptionKey =
      '8a59192fde85049ec6f11517f871088f96ab97c1ff8f1529bb33d2f6633d099f';

    const result = decrypt(
      passwordEncrypted,
      Buffer.from(encryptionKey, 'hex'),
    );

    expect(result).toBe('password');
  });

  it('should generate an encrypted key', () => {
    const key = generateEncryptionKey('demo@email.com', 'password');
    expect(isMd5(key)).toBe(true);
  });

  it('should geenrate a valid hash', () => {
    const hash = generateAuthHash('demo@email.com', 'password');
    expect(isMd5(hash)).toBe(true);
  });
});
