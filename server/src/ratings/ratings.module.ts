import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  controllers: [RatingsController],
  providers: [RatingsService]
})
export class RatingsModule { }
