import { PartialType } from '@nestjs/mapped-types';
import { CreateClaimFormDto } from './create-claim-form.dto';

export class UpdateClaimFormDto extends PartialType(CreateClaimFormDto) {}
