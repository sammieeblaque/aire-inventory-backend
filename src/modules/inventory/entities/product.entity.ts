import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  costStuffclear: number;

  @Column('decimal')
  costPrice: number;

  @Column('decimal')
  sellingPrice: number;

  @Column('int')
  quantity: number;
}
