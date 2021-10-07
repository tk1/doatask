import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { Domain } from './domain.entity'

@Injectable()
export class DomainsService {
  constructor(
    @InjectRepository(Domain)
    private readonly domainsRepository: Repository<Domain>
  ) { }

  create(createDomainDto: CreateDomainDto) {
    const domain = new Domain();
    Object.assign(domain, createDomainDto)

    return this.domainsRepository.save(domain);
  }

  findAll() {
    return this.domainsRepository.find();
  }

  findOne(id: number) {
    return this.domainsRepository.findOne(id)
  }

  async update(id: number, updateDomainDto: UpdateDomainDto) {
    const toUpdate = await this.domainsRepository.findOne(id)
    const updated = Object.assign(toUpdate, updateDomainDto)
    return this.domainsRepository.save(updated);
  }

  remove(id: number) {
    return this.domainsRepository.delete(id)
  }
}
