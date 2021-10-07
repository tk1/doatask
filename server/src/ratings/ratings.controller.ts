import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ratings')
@UseGuards(JwtAuthGuard)
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) { }

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto);
  }

  @Get()
  findAll() {
    return this.ratingsService.find({});
  }

  @Get('user/:id/all')
  findUserAll(@Param('id') id: string) {
    return this.ratingsService.findWhere({ ownerid: Number(id), type: 'user' });
  }

  @Get('user/:id/latest')
  findUserLatest(@Param('id') id: string) {
    return this.ratingsService.findWhere({ ownerid: Number(id), type: 'user', latest: true });
  }

  @Get('top/:count/:domainid')
  getTop(@Param('count') count: number, @Param('domainid') domainId: number) {
    return this.ratingsService.getTop(count, domainId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingsService.remove(+id);
  }
}
