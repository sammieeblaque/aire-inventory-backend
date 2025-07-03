import { Entity, Column, ManyToOne } from 'typeorm';
import { Wallet } from './wallet.entity';
import { BaseEntity } from 'src/@shared/base.entity';

export enum HoldStatus {
  ACTIVE = 'active',
  RELEASED = 'released',
  EXECUTED = 'executed',
  EXPIRED = 'expired',
}

@Entity()
export class Hold extends BaseEntity {
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

  @Column({ nullable: true, type: 'jsonb' })
  metadata: Record<string, any>;
}
