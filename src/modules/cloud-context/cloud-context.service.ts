import { Injectable, NotFoundException } from '@nestjs/common';
import { AddArticleDto } from './dto/add-article.dto';

@Injectable()
export class CloudContextService {
  private readonly contexts = new Map<string, Array<{ articleId: string; quantity: number }>>();

  createContext() {
    const contextId = Math.random().toString(36).slice(2, 18);
    this.contexts.set(contextId, []);
    return { contextId };
  }

  addArticle(dto: AddArticleDto) {
    const items = this.contexts.get(dto.contextId);
    if (!items) throw new NotFoundException('Context not found');
    items.push({ articleId: dto.articleId, quantity: dto.quantity || 1 });
    return { contextId: dto.contextId, items };
  }

  getContext(contextId: string) {
    const items = this.contexts.get(contextId);
    if (!items) throw new NotFoundException('Context not found');
    return { contextId, items };
  }
}
