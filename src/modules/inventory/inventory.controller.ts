import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
  Put,
  Param,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SellProductDto } from './dto/sell-product.dto';
import { IQuery } from 'src/@types';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { UploadsService } from 'src/@shared/uploadFile';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('api/inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly uploadService: UploadsService<Product>,
  ) {}

  @Post('products')
  addProduct(@Body() createProductDto: CreateProductDto) {
    return this.inventoryService.addProduct(createProductDto);
  }

  @Post('sell')
  sellProduct(@Body() sellProductDto: SellProductDto) {
    return this.inventoryService.sellProduct(sellProductDto);
  }

  @Get('report')
  getInventoryReport(@Query() query: IQuery) {
    return this.inventoryService.getInventoryReport(query);
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiProperty({ name: 'file' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const data = await this.uploadService.uploadProductFile(file.buffer);
    return this.inventoryService.createManyProducts(data);
  }

  @Put('update/:id')
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ) {
    return this.inventoryService.updateProducts(updateProductDto, id);
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return this.inventoryService.getProductById(id);
  }
}
