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
import { UpdateVaultDto } from './dto/update-vault.dto';

@Controller('vaults')
export class VaultsController {
  constructor(private readonly vaultsService: VaultsService) {}

  @Post()
  create(@Body() createVaultDto: CreateVaultDto) {
    return this.vaultsService.create(createVaultDto);
  }

  @Get()
  findAll() {
    return this.vaultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaultsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVaultDto: UpdateVaultDto) {
    return this.vaultsService.update(+id, updateVaultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaultsService.remove(+id);
  }
}
