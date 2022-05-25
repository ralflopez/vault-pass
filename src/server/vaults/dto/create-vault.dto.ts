import { IsDefined, IsString } from 'class-validator';
import { IsMd5 } from '../decorators/is-md5';

export class CreateVaultDto {
  @IsDefined()
  @IsString()
  @IsMd5()
  authHash: string;

  @IsDefined()
  @IsString()
  @IsMd5()
  encryptionKey: string;

  @IsDefined()
  @IsString()
  domain: string;

  @IsDefined()
  @IsString()
  @IsMd5()
  value: string;
}
