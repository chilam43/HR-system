import { Controller, Get } from '@nestjs/common';
import { AccessLevelService } from './access-level.service';

@Controller('access-level')
export class AccessLevelController {
  constructor(private readonly accessLevelService: AccessLevelService) { }

  @Get('list')
  async fetchAccessLevel() {
    let result = await this.accessLevelService.fetchAccessLevel()
    return result
  }
}
