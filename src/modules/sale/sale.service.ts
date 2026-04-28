import { Injectable, NotFoundException } from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { SetCustomerDto } from './dto/set-customer.dto';

type CartItem = { id: string; name: string; price: number; quantity: number };
type SaleContext = {
  id: string;
  customer?: { rut: string; name: string };
  items: CartItem[];
  createdAt: string;
};

const PRODUCTS = [
  { id: '267658', name: 'EUCER.CAPILL.TRAT.REVI100', price: 19990 },
  { id: '267659', name: 'EUCER.DERMO.PACK.HIDRA', price: 25990 },
  { id: '267660', name: 'MAICAO.SHAMPOO.SUAVE', price: 8990 },
  { id: '267661', name: 'CRUZVERDE.GEL.LIMPIADOR', price: 7490 },
  { id: '267662', name: 'SUPERSANA.VITAMINA.C', price: 11990 },
];

@Injectable()
export class SaleService {
  private readonly contexts = new Map<string, SaleContext>();

  createContext() {
    const contextId = Math.random().toString(36).slice(2, 18);
    this.contexts.set(contextId, {
      id: contextId,
      items: [],
      createdAt: new Date().toISOString(),
    });
    return { contextId };
  }

  getContext(contextId: string) {
    const ctx = this.contexts.get(contextId);
    if (!ctx) throw new NotFoundException('Context not found');
    return ctx;
  }

  searchProducts(query: string, contextId: string) {
    this.getContext(contextId);
    const q = query.trim().toUpperCase();
    const items = PRODUCTS.filter((p) => p.name.includes(q) || p.id.includes(q));
    return {
      items,
      blockedCount: 0,
      query,
      contextId,
    };
  }

  addItem(dto: AddItemDto) {
    const ctx = this.getContext(dto.contextId);
    const product = PRODUCTS.find((p) => p.id === dto.productId);
    if (!product) throw new NotFoundException('Product not found');

    const existing = ctx.items.find((i) => i.id === product.id);
    if (existing) {
      existing.quantity += dto.quantity || 1;
    } else {
      ctx.items.push({ ...product, quantity: dto.quantity || 1 });
    }

    return this.summary(ctx.id);
  }

  setCustomer(dto: SetCustomerDto) {
    const ctx = this.getContext(dto.contextId);
    ctx.customer = { rut: dto.rut, name: dto.name };
    return ctx;
  }

  createPayment(dto: CreatePaymentDto) {
    const ctx = this.getContext(dto.contextId);
    const total = ctx.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const change = Math.max(0, Number(dto.amountPaid || 0) - total);

    return {
      contextId: dto.contextId,
      method: dto.method,
      total,
      amountPaid: dto.amountPaid,
      change,
      approved: Number(dto.amountPaid || 0) >= total,
      receiptId: `R-${Date.now()}`,
    };
  }

  summary(contextId: string) {
    const ctx = this.getContext(contextId);
    const total = ctx.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return {
      contextId,
      customer: ctx.customer,
      items: ctx.items,
      total,
    };
  }

  clear(contextId: string) {
    this.contexts.delete(contextId);
    return { ok: true };
  }
}
