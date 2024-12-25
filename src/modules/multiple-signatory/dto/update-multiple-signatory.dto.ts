import { PartialType } from '@nestjs/mapped-types';
import { CreateMultipleSignatoryDto } from './create-multiple-signatory.dto';

export class UpdateMultipleSignatoryDto extends PartialType(
  CreateMultipleSignatoryDto,
) {}
