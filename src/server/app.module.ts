import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViewModule } from './view/view.module';
import { PrismaService } from './prisma/prisma.service';
import { VaultsModule } from './vaults/vaults.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ViewModule, VaultsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
