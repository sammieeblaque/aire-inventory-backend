import { BaseEntity } from 'src/@shared/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Sale extends BaseEntity {
  @Column()
  productName: string;

  @Column('int')
  quantity: number;

  @Column('decimal')
  totalSaleValue: number;

  @Column('decimal', { default: 0 })
  startValue: number;

  @Column('decimal')
  profit: number;

  @Column('timestamp')
  date: Date;
}
