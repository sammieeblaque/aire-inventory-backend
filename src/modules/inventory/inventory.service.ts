import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { SellProductDto } from './dto/sell-product.dto';
import { Product } from './entities/product.entity';
import { Sale } from './entities/sale.entity';

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

  async getInventoryReport(): Promise<Product[]> {
    return this.productRepository.find();
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

    return sales.reduce((total, sale) => total + sale.profit, 0);
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

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find({
      order: { name: 'ASC' },
    });
  }
}
