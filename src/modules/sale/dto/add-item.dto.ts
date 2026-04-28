export class AddItemDto {
  contextId!: string;
  productId?: string;
  articleId?: string;
  quantity = 1;
}
