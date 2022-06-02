import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private ALGORITHM = 'aes-256-cbc'; //Using AES encryption

  // Decrypting text
  decrypt(text: string, key: Buffer) {
    const [ivStr, encryptedStr] = text.split('.');
    if (!ivStr || !encryptedStr) {
      throw Error('Invalid ciphertext');
    }

    const iv = Buffer.from(ivStr, 'hex');
    const encryptedText = Buffer.from(encryptedStr, 'hex');
    const decipher = crypto.createDecipheriv(
      this.ALGORITHM,
      Buffer.from(key),
      iv,
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
