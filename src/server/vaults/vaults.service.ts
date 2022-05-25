import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';

@Injectable()
export class VaultsService {
  constructor(private prisma: PrismaService) {}

  create(createVaultDto: CreateVaultDto) {
    return 'This action adds a new vault';
  }

  findAll() {
    return `This action returns all vaults`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vault`;
  }

  update(id: number, updateVaultDto: UpdateVaultDto) {
    return `This action updates a #${id} vault`;
  }

  remove(id: number) {
    return `This action removes a #${id} vault`;
  }
}
