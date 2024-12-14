import { Module } from '@nestjs/common';
import { Product } from '../inventory/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadsService } from './uploads.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [UploadsService],
  exports: [UploadsService],
})
export class UploadsModule {}
