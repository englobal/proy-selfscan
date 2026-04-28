export class CreatePaymentDto {
  contextId!: string;
  method!: 'cash' | 'card' | 'mixed';
  amountPaid!: number;
}
