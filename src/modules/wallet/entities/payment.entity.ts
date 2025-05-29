import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  RETRYING = 'retrying',
}

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  idempotencyKey: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  currency: string;

  @Column()
  customerId: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({ nullable: true })
  paymentProviderReference: string;

  @Column({ default: 0 })
  retryCount: number;

  @Column({ nullable: true })
  failureReason: string;

  @Column({ nullable: true })
  lastRetryAt: Date;
}
