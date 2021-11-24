import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { CodeService } from './code.service';
import { RunCodeDto } from './runCodeDto';

@Controller('code')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CodeController {

  constructor(private readonly codeService: CodeService) { }

  @Post('runPublicCodeTests')
  @Roles('student')
  runPublicCodeTests(@Body() runCodeDto: RunCodeDto) {
    return this.codeService.runPublicCodeTests(runCodeDto);
  }
}