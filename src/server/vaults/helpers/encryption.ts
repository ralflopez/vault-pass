//Checking the crypto module
import * as crypto from 'crypto';
const ALGORITHM = 'aes-256-cbc'; //Using AES encryption

//Encrypting text
export function encrypt(text: string, key: Buffer) {
  const iv = crypto.randomBytes(16);
  const ivStr = iv.toString('hex');

  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const encryptedStr = encrypted.toString('hex');

  return `${ivStr}.${encryptedStr}`;
}

// Decrypting text
export function decrypt(text: string, key: Buffer) {
  const [ivStr, encryptedStr] = text.split('.');
  if (!ivStr || !encryptedStr) {
    throw Error('Invalid ciphertext');
  }

  const iv = Buffer.from(ivStr, 'hex');
  const encryptedText = Buffer.from(encryptedStr, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export function generateEncryptionKey(email: string, password: string) {
  return crypto
    .pbkdf2Sync(`${email}|${password}`, 'salt', 5000, 32, 'sha512')
    .toString('hex');
}

export function generateAuthHash(encryptionKey: string) {
  return crypto
    .pbkdf2Sync(encryptionKey, 'salt', 1, 32, 'sha512')
    .toString('hex');
}
