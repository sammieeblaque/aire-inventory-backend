export class CreateWalletDto {
  userId: string;
  currency?: string;
}

export class TransactionDto {
  amount: number;
  description?: string;
}
