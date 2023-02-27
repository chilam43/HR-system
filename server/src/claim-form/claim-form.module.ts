import { Module } from '@nestjs/common';
import { ClaimFormService } from './claim-form.service';
import { ClaimFormController } from './claim-form.controller';

@Module({
  controllers: [ClaimFormController],
  providers: [ClaimFormService]
})
export class ClaimFormModule {}
