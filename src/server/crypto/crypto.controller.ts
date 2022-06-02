import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('api/crypto')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {}

  @Get('/decrypt')
  decrypt(
    @Query('value') value: string,
    @Query('encryptionKey') encryptionKey: string,
  ): string {
    try {
      return this.cryptoService.decrypt(
        value,
        Buffer.from(encryptionKey, 'hex'),
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
