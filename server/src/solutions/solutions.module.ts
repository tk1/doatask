import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solution } from './solution.entity';
import { SolutionsController } from './solutions.controller';
import { SolutionsService } from './solutions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Solution]),
  ],
  controllers: [SolutionsController],
  providers: [SolutionsService]
})
export class SolutionsModule { }
