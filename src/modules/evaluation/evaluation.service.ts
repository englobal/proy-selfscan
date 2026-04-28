import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluationService {
  evaluate(cartTotal: number) {
    const discount = cartTotal >= 30000 ? Math.round(cartTotal * 0.1) : 0;
    return {
      cartTotal,
      discount,
      payable: cartTotal - discount,
      rulesApplied: discount > 0 ? ['10_PERCENT_OVER_30000'] : [],
    };
  }
}
