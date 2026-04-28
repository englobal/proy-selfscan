export class GetContextResponseDto {
  contextId!: string;
  items!: Array<{ articleId: string; quantity: number }>;
}
