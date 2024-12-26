import { BaseEntity } from 'src/@shared/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Wallet extends BaseEntity {
  @Column('uuid')
  userId: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column('varchar', { length: 3, default: 'USD' })
  currency: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.wallets)
  user: User;
}
