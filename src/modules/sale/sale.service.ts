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
  status?: 'open' | 'paid' | 'closed' | 'cancelled';
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
      status: 'open',
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
    const requestedId = dto.productId ?? dto.articleId;
    const product = PRODUCTS.find((p) => p.id === requestedId);
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
    ctx.customer = { rut: dto.rut, name: dto.name || 'Cliente' };
    return ctx;
  }

  clearItem(dto: AddItemDto) {
    const ctx = this.getContext(dto.contextId);
    const requestedId = dto.productId ?? dto.articleId;
    const existing = ctx.items.find((i) => i.id === requestedId);
    if (!existing) {
      return this.summary(ctx.id);
    }

    const qty = Number(dto.quantity || 1);
    existing.quantity = Math.max(0, existing.quantity - qty);
    ctx.items = ctx.items.filter((i) => i.quantity > 0);
    return this.summary(ctx.id);
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

  totalize(contextId: string) {
    return this.summary(contextId);
  }

  paymentMethods(contextId: string) {
    this.getContext(contextId);
    return {
      contextId,
      methods: [
        { id: 'cash', name: 'Efectivo' },
        { id: 'debit', name: 'Debito' },
        { id: 'credit', name: 'Credito' },
      ],
    };
  }

  pay(contextId: string) {
    const ctx = this.getContext(contextId);
    const total = ctx.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    ctx.status = 'paid';
    return {
      contextId,
      total,
      approved: true,
      receiptId: `R-${Date.now()}`,
    };
  }

  close(contextId: string) {
    const ctx = this.getContext(contextId);
    ctx.status = 'closed';
    return {
      contextId,
      closed: true,
    };
  }

  cancel(contextId?: string) {
    if (!contextId) {
      return { cancelled: false, reason: 'contextId required' };
    }
    const ctx = this.getContext(contextId);
    ctx.status = 'cancelled';
    ctx.items = [];
    return { contextId, cancelled: true };
  }

  evaluate(payload: Record<string, unknown>) {
    const quantity = Number(payload.quantity ?? 1);
    const product = (payload.product as Record<string, unknown>) || {};
    const customer = payload.customer;
    const unitPrice = Number(product.price ?? 0);
    const subtotal = unitPrice * quantity;
    const hasCustomer = Boolean(customer);
    const discountRate = hasCustomer ? 0.1 : 0.05;
    const discount = Math.round(subtotal * discountRate);

    return {
      quantity,
      subtotal,
      discount,
      total: subtotal - discount,
      hasCustomer,
      rulesApplied: [hasCustomer ? 'CUSTOMER_10' : 'NO_CUSTOMER_5'],
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
      status: ctx.status,
    };
  }

  clear(contextId: string) {
    this.contexts.delete(contextId);
    return { ok: true };
  }
}
