import { Vault } from '@prisma/client';

export type VaultRecordWithoutAuthHash = Omit<Vault, 'authHash'>;
