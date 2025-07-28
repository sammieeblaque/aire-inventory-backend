import { BaseEntity } from 'src/@shared/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  costPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  sellingPrice: number;

  @Column('int')
  quantity: number;
}
