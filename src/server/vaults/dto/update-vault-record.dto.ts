import { IsDefined, IsString } from 'class-validator';
import { IsMd5 } from '../decorators/is-md5';

export class UpdateVaultRecordDto {
  @IsDefined()
  @IsString()
  @IsMd5()
  encryptionKey: string;

  @IsDefined()
  @IsString()
  value: string;
}
