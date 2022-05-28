import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VaultsService } from './vaults.service';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultRecordDto } from './dto/update-vault-record.dto';

@Controller('api/vaults')
export class VaultsController {
  constructor(private readonly vaultsService: VaultsService) {}

  @Post()
  create(@Body() createVaultDto: CreateVaultDto) {
    return this.vaultsService.createVaultRecordInVault(createVaultDto);
  }

  @Get('/:authHash')
  findOneVault(
    @Param('authHash') authHash: string,
    @Query('domain') domain: string,
  ) {
    if (domain) {
      return this.vaultsService.findOneVaultRecordByDomain(authHash, domain);
    }
    return this.vaultsService.findOneVault(authHash);
  }

  @Patch('/:authHash/:id')
  updateVaultRecord(
    @Param('authHash') authHash: string,
    @Param('id') id: string,
    @Body() updateVaultRecordDto: UpdateVaultRecordDto,
  ) {
    return this.vaultsService.updateVaultRecord(
      authHash,
      id,
      updateVaultRecordDto,
    );
  }

  @Delete('/:authHash/:id')
  removeVaultRecord(
    @Param('authHash') authHash: string,
    @Param('id') id: string,
  ) {
    return this.vaultsService.removeVaultRecord(authHash, id);
  }
}
