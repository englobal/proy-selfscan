import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { SetCustomerDto } from './dto/set-customer.dto';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('context')
  createContext() {
    return this.saleService.createContext();
  }

  @Get('context/:contextId')
  getContext(@Param('contextId') contextId: string) {
    return this.saleService.getContext(contextId);
  }

  @Get('products/search/:query/:contextId')
  searchProducts(@Param('query') query: string, @Param('contextId') contextId: string) {
    return this.saleService.searchProducts(query, contextId);
  }

  @Post('item')
  addItem(@Body() dto: AddItemDto) {
    return this.saleService.addItem(dto);
  }

  @Post('items')
  addItemsCompat(@Body() dto: AddItemDto) {
    return this.saleService.addItem(dto);
  }

  @Post('items/clear')
  clearItemsCompat(@Body() dto: AddItemDto) {
    return this.saleService.clearItem(dto);
  }

  @Post('customer')
  setCustomer(@Body() dto: SetCustomerDto) {
    return this.saleService.setCustomer(dto);
  }

  @Post('payment')
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.saleService.createPayment(dto);
  }

  @Get('payment-methods/:contextId')
  paymentMethods(@Param('contextId') contextId: string) {
    return this.saleService.paymentMethods(contextId);
  }

  @Post('pay/:contextId')
  pay(@Param('contextId') contextId: string) {
    return this.saleService.pay(contextId);
  }

  @Post('totalize/:contextId')
  totalize(@Param('contextId') contextId: string) {
    return this.saleService.totalize(contextId);
  }

  @Post('close/:contextId')
  close(@Param('contextId') contextId: string) {
    return this.saleService.close(contextId);
  }

  @Post('cancel/:contextId?')
  cancel(@Param('contextId') contextId?: string) {
    return this.saleService.cancel(contextId);
  }

  @Post('products/evaluate')
  evaluate(@Body() payload: Record<string, unknown>) {
    return this.saleService.evaluate(payload);
  }

  @Get('summary/:contextId')
  summary(@Param('contextId') contextId: string) {
    return this.saleService.summary(contextId);
  }

  @Delete('context/:contextId')
  clear(@Param('contextId') contextId: string) {
    return this.saleService.clear(contextId);
  }
}
