import { Body, Controller, Post } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post('discount')
  getDiscount(@Body() body: { cartTotal: number }) {
    return this.evaluationService.evaluate(Number(body?.cartTotal || 0));
  }
}
