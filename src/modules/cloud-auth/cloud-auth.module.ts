import { Module } from '@nestjs/common';
import { CloudAuthService } from './cloud-auth.service';

@Module({
  providers: [CloudAuthService],
  exports: [CloudAuthService],
})
export class CloudAuthModule {}
