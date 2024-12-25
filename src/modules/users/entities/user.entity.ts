import { Wallet } from 'src/modules/wallet/entities/wallet.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Wallet, (wallet) => wallet.user, {
    cascade: true,
    eager: true,
  })
  wallets: Wallet[];
}
