import { Module } from '@nestjs/common';
import { VaultsService } from './vaults.service';
import { VaultsController } from './vaults.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VaultsController],
  providers: [VaultsService],
})
export class VaultsModule {}
