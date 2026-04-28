import { Module } from '@nestjs/common';
import { CloudContextService } from './cloud-context.service';

@Module({
  providers: [CloudContextService],
  exports: [CloudContextService],
})
export class CloudContextModule {}
