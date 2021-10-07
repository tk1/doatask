import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LtiService } from './lti.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorators'
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('ltiadmin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LtiController {
  constructor(private readonly ltiService: LtiService) { }

  @Post('platform')
  @Roles('admin')
  create(@Body() createPlatformDto: any) {
    return this.ltiService.registerPlatform(createPlatformDto);
  }
}
