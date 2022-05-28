import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVaultDto } from './dto/create-vault.dto';
import { encrypt } from './helpers/encryption';
import { VaultRecordWithoutAuthHash } from '../../types/vault';
import { UpdateRecordDto } from './dto/update-record.dto';
import { RemoveRecordDto } from './dto/remove-record.dto';

@Injectable()
export class VaultsService {
  constructor(private prisma: PrismaService) {}

  async createRecordInVault({
    authHash,
    domain,
    encryptionKey,
    value,
  }: CreateVaultDto): Promise<VaultRecordWithoutAuthHash> {
    let encryptedValue = '';
    try {
      encryptedValue = encrypt(value, Buffer.from(encryptionKey, 'hex'));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    // Encrypt value
    try {
      // Insert into database
      const result = (await this.prisma.vault.create({
        data: {
          authHash,
          domain,
          value: encryptedValue,
        },
        select: {
          domain: true,
          id: true,
          value: true,
        },
      })) as VaultRecordWithoutAuthHash;

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Find one vault (all passwords)
  async findOneVault(authHash: string): Promise<VaultRecordWithoutAuthHash[]> {
    let result: VaultRecordWithoutAuthHash[] = [];
    try {
      result = (await this.prisma.vault.findMany({
        where: {
          authHash,
        },
        select: {
          domain: true,
          id: true,
          value: true,
        },
      })) as VaultRecordWithoutAuthHash[];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (result.length < 1) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return result;
  }

  async findOneRecordByDomain(
    authHash: string,
    domain: string,
  ): Promise<VaultRecordWithoutAuthHash> {
    let result: VaultRecordWithoutAuthHash;
    try {
      result = (await this.prisma.vault.findFirst({
        where: {
          authHash,
          domain,
        },
        select: {
          domain: true,
          id: true,
          value: true,
        },
      })) as VaultRecordWithoutAuthHash;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!result) {
      throw new HttpException('No record found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateRecord(
    id: string,
    { encryptionKey, value }: UpdateRecordDto,
  ): Promise<VaultRecordWithoutAuthHash> {
    // Encrypt value
    const encryptedValue = encrypt(value, Buffer.from(encryptionKey));

    // Fetch vault
    try {
      const record = await this.prisma.vault.update({
        where: {
          id,
        },
        data: {
          id,
          value: encryptedValue,
        },
        select: {
          domain: true,
          id: true,
          value: true,
        },
      });

      return record;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeRecord(
    id: string,
    { authHash }: RemoveRecordDto,
  ): Promise<VaultRecordWithoutAuthHash> {
    try {
      const result = (await this.prisma.vault.findFirst({
        where: {
          authHash,
          id,
        },
        select: {
          domain: true,
          id: true,
          value: true,
        },
      })) as VaultRecordWithoutAuthHash;

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
