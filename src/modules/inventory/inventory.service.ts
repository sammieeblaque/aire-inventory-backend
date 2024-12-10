import {
  Injectable,
  NotFoundException,
  ConflictException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { SellProductDto } from './dto/sell-product.dto';
import { Product } from './entities/product.entity';
import { Sale } from './entities/sale.entity';
import { ApiQuery } from '@nestjs/swagger';
import { IQuery, PaginatedResponse } from 'src/@types';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) {}

  async addProduct(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: { name: createProductDto.name },
    });

    if (existingProduct) {
      throw new ConflictException(
        `Product ${createProductDto.name} already exists`,
      );
    }

    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async sellProduct(sellProductDto: SellProductDto): Promise<Sale> {
    const { name, quantity } = sellProductDto;

    // Find the product
    const product = await this.productRepository.findOne({
      where: { name },
    });

    if (!product) {
      throw new NotFoundException(`Product ${name} not found`);
    }

    // Check available quantity
    if (product.quantity < quantity) {
      throw new ConflictException(`Insufficient stock for ${name}`);
    }

    // Update product quantity
    product.quantity -= quantity;
    await this.productRepository.save(product);

    // Calculate sale details
    const totalSaleValue = product.sellingPrice * quantity;
    const totalCostValue = product.costPrice * quantity;
    const profit = totalSaleValue - totalCostValue;

    // Create sale record
    const sale = this.saleRepository.create({
      productName: name,
      quantity,
      totalSaleValue,
      profit,
      date: new Date(),
    });

    return this.saleRepository.save(sale);
  }

  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getInventoryReport(
    @Query() query: IQuery,
  ): Promise<PaginatedResponse<Product>> {
    query.page = Number(query.page) > 1 ? Number(query.page) - 1 : 0;
    const take = Number(query.limit) || 10;
    const skip = query.page * take || 0;

    const [result, total] = await this.productRepository.findAndCount({
      take: take,
      skip: skip,
    });

    const numberOfPages = Math.ceil(total / take);

    return {
      data: result,
      meta: {
        total: total,
        page: query.page + 1,
        limit: query.limit,
        count: result.length,
        pages: numberOfPages,
        next: query.page < numberOfPages ? query.page + 1 : false,
        prev: query.page > 1 ? query.page - 1 : false,
        totalRecords: total,
      },
    };
  }

  async getDailyProfit(date?: Date): Promise<number> {
    const targetDate = date || new Date();
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const sales = await this.saleRepository.find({
      where: {
        date: Between(startOfDay, endOfDay),
      },
    });

    const totalProfit = sales.reduce((total, sale) => +total + +sale.profit, 0);

    return totalProfit;
  }

  async getTotalInventoryValue(): Promise<number> {
    const products = await this.productRepository.find();
    return products.reduce(
      (total, product) => total + product.quantity * product.costPrice,
      0,
    );
  }

  async getSalesHistory(): Promise<Sale[]> {
    return this.saleRepository.find({
      order: { date: 'DESC' },
    });
  }
}
