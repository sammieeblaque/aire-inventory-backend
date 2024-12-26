import { BaseEntity } from 'src/@shared/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column('decimal')
  costPrice: number;

  @Column('decimal')
  sellingPrice: number;

  @Column('int')
  quantity: number;
}
