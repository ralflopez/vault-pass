import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../prisma/prisma.service';
import { vaultStub } from '../stubs/vault.stub';
import { CreateVaultDto } from '../../vaults/dto/create-vault.dto';
import {
  decrypt,
  generateAuthHash,
  generateEncryptionKey,
} from '../../vaults/helpers/encryption';

describe('VaultController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const user1 = {
    encryptionKey: generateEncryptionKey('demo@email.com', 'password'),
    authHash: generateAuthHash('demo@email.com', 'password'),
  };

  const user2 = {
    encryptionKey: generateEncryptionKey('demo2@email.com', 'password'),
    authHash: generateAuthHash('demo2@email.com', 'password'),
  };

  async function seed() {
    // seed
    return prisma.vault.createMany({
      data: [
        vaultStub(
          user1.encryptionKey,
          user1.authHash,
          'amazon.com',
          'password1',
        ),
        vaultStub(
          user1.encryptionKey,
          user1.authHash,
          'facebook.com',
          'password1',
        ),
        vaultStub(
          user2.encryptionKey,
          user2.authHash,
          'twitter.com',
          'password2',
        ),
        vaultStub(
          user2.encryptionKey,
          user2.authHash,
          'amazon.com',
          'password2',
        ),
      ],
    });
  }

  async function seedUser1() {
    return prisma.vault.create({
      data: vaultStub(
        user1.encryptionKey,
        user1.authHash,
        'amazon.com',
        'password1',
      ),
    });
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // add to enable class validator
    await app.init();
    if (!prisma) prisma = moduleFixture.get<PrismaService>(PrismaService);
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

  describe('findOneVault', () => {
    it('should find a vault with all records for a user', async () => {
      await seed();
      const res = await request(app.getHttpServer()).get(
        `/vaults/${user1.authHash}`,
      );

      expect(res.body.length).toBe(2);
    });

    it('should return a FORBIDDEN error if no vault found', async () => {
      const res = await request(app.getHttpServer()).get(
        `/vaults/${generateAuthHash('invalid@email.com', 'password')}`,
      );
      expect(res.status).toBe(HttpStatus.FORBIDDEN);
    });
  });

  describe('findOneVaultByDomain', () => {
    it('should return a valid vault record', async () => {
      await seed();
      const res = await request(app.getHttpServer()).get(
        `/vaults/${user1.authHash}?domain=amazon.com`,
      );

      expect(
        decrypt(res.body.value, Buffer.from(user1.encryptionKey, 'hex')),
      ).toEqual('password1');
    });

    it('should return a NOT FOUND error if no vault record found', async () => {
      const res = await request(app.getHttpServer()).get(
        `/vaults/${user1.authHash}/invalid.com`,
      );

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('updateVaultRecord', () => {
    it('should update a vault record with the correct value', async () => {
      const record = await seedUser1();
      const res = await request(app.getHttpServer())
        .patch(`/vaults/${user1.authHash}/${record.id}`)
        .send({
          encryptionKey: user1.encryptionKey,
          value: 'newPassword',
        });

      expect(
        decrypt(res.body.value, Buffer.from(user1.encryptionKey, 'hex')),
      ).toEqual('newPassword');
    });

    it('should return a NOT FOUND error if no vault record found', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/vaults/${user1.authHash}/invalid`)
        .send({
          encryptionKey: user1.encryptionKey,
          value: 'newPassword',
        });

      expect(res.status).toBe(HttpStatus.NOT_FOUND);
      expect(res.body.message).toBeDefined();
    });
  });
});
