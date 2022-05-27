import { IsDefined, IsString } from 'class-validator';
import { IsMd5 } from '../decorators/is-md5';

export class RemoveRecordDto {
  @IsDefined()
  @IsString()
  @IsMd5()
  authHash: string;
}
