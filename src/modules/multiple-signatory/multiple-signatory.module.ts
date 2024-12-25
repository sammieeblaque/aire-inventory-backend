import { Module } from '@nestjs/common';
import { MultiSignatureService } from './multiple-signatory.service';
import { MultipleSignatoryController } from './multiple-signatory.controller';

@Module({
  controllers: [MultipleSignatoryController],
  providers: [MultiSignatureService],
})
export class MultipleSignatoryModule {}
