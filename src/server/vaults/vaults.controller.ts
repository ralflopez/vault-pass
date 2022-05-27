import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VaultsService } from './vaults.service';
import { CreateVaultDto } from './dto/create-vault.dto';

@Controller('vaults')
export class VaultsController {
  constructor(private readonly vaultsService: VaultsService) {}

  @Post()
  create(@Body() createVaultDto: CreateVaultDto) {
    return this.vaultsService.createRecordInVault(createVaultDto);
  }

  @Get()
  findAll() {
    return 'Hello World';
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.vaultsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRecordDto: UpdateRecordDto) {
  //   return this.vaultsService.update(+id, updateVaultDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.vaultsService.remove(+id);
  // }
}
