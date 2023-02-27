import { Module } from '@nestjs/common';
import { JobTitleService } from './job_title.service';
import { JobTitleController } from './job_title.controller';

@Module({
  providers: [JobTitleService],
  controllers: [JobTitleController]
})
export class JobTitleModule {}
