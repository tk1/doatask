import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './rating.entity'

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingsRepository: Repository<Rating>
  ) { }

  async create(createRatingDto: CreateRatingDto) {
    const rating = new Rating();
    Object.assign(rating, createRatingDto)
    return this.ratingsRepository.save(rating)
  }

  async find(query: any) {
    return this.ratingsRepository.find(query);
  }

  async findWhere(query) {
    return this.ratingsRepository.find({ where: query, relations: ["domain"] });
  }

  findOne(id: number) {
    return this.ratingsRepository.findOne(id);
  }

  getTop(count: number, domainId: number) {
    const topRatings = this.ratingsRepository
      .createQueryBuilder("rating")
      .leftJoinAndSelect("rating.domain", "domain")
      .select("rating.value")
      .addSelect("rating.id")
      .addSelect("rating.ownerid")
      .where("rating.latest = true")
      .andWhere("rating.type = 'user'")
      .andWhere("domain.id = :domainId", { domainId })
      .orderBy("rating.value", "DESC")
      .limit(count)
      .getMany()
    return topRatings
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    const toUpdate = await this.ratingsRepository.findOne(id)
    const updated = Object.assign(toUpdate, updateRatingDto)
    return this.ratingsRepository.save(updated)
  }

  async updateRecord(record: Rating) {
    return this.ratingsRepository.save(record)
  }

  remove(id: number) {
    return this.ratingsRepository.delete(id)
  }
}
