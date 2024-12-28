import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/@shared/base.entity';
import { Wallet } from 'src/modules/wallet/entities/wallet.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @AutoMap()
  @Column()
  first_name: string;

  @AutoMap()
  @Column()
  last_name: string;

  @AutoMap()
  @Column()
  username: string;

  @AutoMap()
  @Column({
    unique: true,
    name: 'email',
  })
  email: string;

  @Column({ select: false })
  password: string;

  @AutoMap()
  @Column({
    enum: ['admin', 'user'],
  })
  role: string;

  @AutoMap()
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
