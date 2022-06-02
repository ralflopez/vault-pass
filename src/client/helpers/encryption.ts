import CryptoJS from 'crypto-js';

const SALT = 'salt';
const ROUNDS = 5000;
const KEYSIZE = 64;
const ALGO = CryptoJS.algo.SHA512;

export const generateEncryptionKey = (value: string) => {
  const encryptionHash = CryptoJS.PBKDF2(value, SALT, {
    keySize: 512 / KEYSIZE,
    iterations: ROUNDS,
    hasher: ALGO,
  });
  return encryptionHash.toString(CryptoJS.enc.Hex);
};

export const generateAuthHash = (value: string) => {
  const authHash = CryptoJS.PBKDF2(value, SALT, {
    keySize: 512 / KEYSIZE,
    iterations: ROUNDS + 1,
    hasher: ALGO,
  });
  return authHash.toString(CryptoJS.enc.Hex);
};
