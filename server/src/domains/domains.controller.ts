import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DomainsService } from './domains.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorators'
import { RolesGuard } from 'src/auth/guards/roles.guard';


@Controller('domains')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) { }

  @Post()
  @Roles('teacher')
  create(@Body() createDomainDto: CreateDomainDto) {
    return this.domainsService.create(createDomainDto);
  }

  @Get()
  findAll() {
    return this.domainsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domainsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateDomainDto: UpdateDomainDto) {
    return this.domainsService.update(+id, updateDomainDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.domainsService.remove(+id);
  }
}
