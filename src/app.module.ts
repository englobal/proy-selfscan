import { Module } from '@nestjs/common';
import { CloudAuthModule } from './modules/cloud-auth/cloud-auth.module';
import { CloudContextModule } from './modules/cloud-context/cloud-context.module';
import { EvaluationModule } from './modules/evaluation/evaluation.module';
import { RuntimeConfigModule } from './modules/runtime-config/runtime-config.module';
import { SaleModule } from './modules/sale/sale.module';

@Module({
  imports: [CloudAuthModule, CloudContextModule, EvaluationModule, RuntimeConfigModule, SaleModule],
})
export class AppModule {}
