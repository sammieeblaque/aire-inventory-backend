import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';

export enum HoldStatus {
  ACTIVE = 'active',
  RELEASED = 'released',
  EXECUTED = 'executed',
  EXPIRED = 'expired',
}

@Entity()
export class Hold {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Wallet)
  wallet: Wallet;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: HoldStatus,
    default: HoldStatus.ACTIVE,
  })
  status: HoldStatus;

  @Column()
  reason: string;

  @Column({ nullable: true })
  expiresAt: Date;

  @Column({ nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
