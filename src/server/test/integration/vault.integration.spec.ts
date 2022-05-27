import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../prisma/prisma.service';
import { vaultStubForUser1, vaultStubForUser2 } from '../stubs/vault.stub';
import { CreateVaultDto } from '../../vaults/dto/create-vault.dto';
import { decrypt } from '../../vaults/helpers/encryption';

describe('VaultController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  function seed() {
    // seed
    prisma.vault.createMany({
      data: [
        vaultStubForUser1('amazon.com', 'amazonPassword'),
        vaultStubForUser1('google.com', 'googlePassword'),
        vaultStubForUser2('facebook.com', 'facebookPassword'),
        vaultStubForUser2('twitter.com', 'twitterPassword'),
      ],
    });
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // add to enable class validator
    await app.init();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    prisma.cleanDatabase();
  });

  afterAll(() => {
    app.close();
  });

  describe('create', () => {
    it('should create vault record with the right value', async () => {
      const key =
        '8a59192fde85049ec6f11517f871088f96ab97c1ff8f1529bb33d2f6633d099f';
      const password = 'twitterPassword';
      const res = await request(app.getHttpServer())
        .post('/vaults')
        .set('Content-Type', 'application/json')
        .send({
          authHash:
            '02f8cc9b1b7ac6a70cae312778b7fe12a550c01bd95ac73dbf234958aeb90080',
          domain: 'twitter.com',
          encryptionKey: key,
          value: password,
        } as CreateVaultDto);

      expect(decrypt(res.body.value, Buffer.from(key, 'hex'))).toBe(password);
    });

    it('should reject invalid hash', async () => {
      const res = await request(app.getHttpServer())
        .post('/vaults')
        .set('Content-Type', 'application/json')
        .send({
          authHash: 'invalid',
          domain: 'twitter.com',
          encryptionKey: 'invalid',
          value: 'password',
        } as CreateVaultDto);

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
