import { Wallet } from 'src/modules/wallet/entities/wallet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MultiSignature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Wallet)
  wallet: Wallet;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  recipientId: string;

  @Column('simple-array')
  approvers: string[];

  @Column('simple-array')
  approvals: string[];

  @Column('int')
  requiredApprovals: number;

  @Column({ default: false })
  isExecuted: boolean;

  @Column({ default: false })
  isRejected: boolean;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
