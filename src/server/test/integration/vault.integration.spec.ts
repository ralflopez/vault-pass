import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { PrismaService } from '../../prisma/prisma.service';
import { vaultStubForUser1, vaultStubForUser2 } from '../stubs/vault.stub';

describe('VaultController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);

    // seed
    await prisma.vault.createMany({
      data: [
        vaultStubForUser1('amazon.com', 'amazonPassword'),
        vaultStubForUser1('google.com', 'googlePassword'),
        vaultStubForUser1('facebook.com', 'facebookPassword'),
        vaultStubForUser2('twitter.com', 'twitterPassword'),
        vaultStubForUser2('instagram.com', 'instagramPassword'),
      ],
    });
  });

  it('/vaults route exist', () => {
    request(app.getHttpServer())
      .get('/vaults')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(() => {
    app.close();
  });
});
