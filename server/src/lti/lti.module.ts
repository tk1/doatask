import { Module } from '@nestjs/common';
import { LtiService } from './lti.service';
import { LtiMiddleware } from './lti.middleware';
import { LtiController } from './lti.controller';

@Module({
  providers: [LtiService, LtiMiddleware],
  exports: [LtiService, LtiMiddleware],
  controllers: [LtiController]
})
export class LtiModule { }