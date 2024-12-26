import { BaseEntity } from 'src/@shared/base.entity';
import { Wallet } from 'src/modules/wallet/entities/wallet.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  username: string;

  @Column({
    unique: true,
    name: 'email',
  })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    enum: ['admin', 'user'],
  })
  role: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Wallet, (wallet) => wallet.user, {
    cascade: true,
    eager: true,
  })
  wallets: Wallet[];
}
