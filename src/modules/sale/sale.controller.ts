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

  @Post('customer')
  setCustomer(@Body() dto: SetCustomerDto) {
    return this.saleService.setCustomer(dto);
  }

  @Post('payment')
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.saleService.createPayment(dto);
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
