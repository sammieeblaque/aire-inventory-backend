import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productName: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  totalSaleValue: number;

  @Column('decimal')
  costValue: number;

  @Column('decimal')
  profit: number;

  @Column('timestamp')
  date: Date;
}
