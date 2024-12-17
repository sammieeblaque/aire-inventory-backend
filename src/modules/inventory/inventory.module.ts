import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Product } from './entities/product.entity';
import { Sale } from './entities/sale.entity';
import { UploadsService } from 'src/@shared/uploadFile';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Sale]), CacheModule.register()],
  controllers: [InventoryController],
  providers: [InventoryService, UploadsService],
})
export class InventoryModule {}
