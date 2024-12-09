import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SellProductDto } from './dto/sell-product.dto';

@Controller('api/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('products')
  addProduct(@Body() createProductDto: CreateProductDto) {
    return this.inventoryService.addProduct(createProductDto);
  }

  @Post('sell')
  sellProduct(@Body() sellProductDto: SellProductDto) {
    return this.inventoryService.sellProduct(sellProductDto);
  }

  @Get('report')
  getInventoryReport() {
    return this.inventoryService.getInventoryReport();
  }

  @Get('daily-profit')
  getDailyProfit(@Query('date') date?: string) {
    return this.inventoryService.getDailyProfit(
      date ? new Date(date) : undefined,
    );
  }

  @Get('total-value')
  getTotalInventoryValue() {
    return this.inventoryService.getTotalInventoryValue();
  }

  @Get('sales-history')
  getSalesHistory() {
    return this.inventoryService.getSalesHistory();
  }
}
