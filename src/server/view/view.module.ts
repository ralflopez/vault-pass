import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ViewController],
  providers: [ViewService],
})
export class ViewModule {}
