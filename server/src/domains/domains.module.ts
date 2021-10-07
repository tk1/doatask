import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain } from './domain.entity'
import { DomainsService } from './domains.service';
import { DomainsController } from './domains.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Domain])],
  controllers: [DomainsController],
  providers: [DomainsService]
})
export class DomainsModule { }
