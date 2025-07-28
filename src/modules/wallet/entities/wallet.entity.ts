import { BaseEntity } from 'src/@shared/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CNY = 'CNY',
  NGN = 'NGN',
}

@Entity()
export class Wallet extends BaseEntity {
  @Column('uuid')
  userId: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column('varchar', { length: 3, default: 'USD' })
  currency: Currency;

  @Column({ default: true })
  isActive: boolean;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  openingBalance: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  closingBalance: number;

  @ManyToOne(() => User, (user) => user.wallets)
  user: User;
}
