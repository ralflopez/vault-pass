//Checking the crypto module
import axios from 'axios';
import * as crypto from 'crypto';
import * as CryptoJS from 'crypto-js';
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

export function generateAuthHash(email: string, password: string) {
  return crypto
    .pbkdf2Sync(`${email}|${password}`, 'salt', 5001, 32, 'sha512')
    .toString('hex');
}

export const generateEncryptionKey2 = (value: string) => {
  const encryptionHash = CryptoJS.PBKDF2(value, 'salt', {
    keySize: 512 / 64,
    iterations: 5000,
    hasher: CryptoJS.algo.SHA512,
  });
  return encryptionHash.toString(CryptoJS.enc.Hex);
};

// const ek = generateEncryptionKey('demo@email.com', 'password');
// const ek2 = generateEncryptionKey2('demo@email.com|password');
// console.log(ek2);
// console.log(ek);

// const e = encrypt('passowrd', Buffer.from(ek, 'hex'));
// console.log(e);
// const d = decrypt(
//   'a2f82a03be39ab6f62062da5d2cf0956.debfc7b2a51cddfe257f5336042d7d9b',
//   Buffer.from(ek2, 'hex'),
// );
// console.log(d);
