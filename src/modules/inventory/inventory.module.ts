import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Product } from './entities/product.entity';
import { Sale } from './entities/sale.entity';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Sale]), UploadsModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
