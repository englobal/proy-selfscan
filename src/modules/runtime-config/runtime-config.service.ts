import { Injectable } from '@nestjs/common';
import { DEFAULT_RUNTIME_CONFIG } from './runtime-config.constants';

@Injectable()
export class RuntimeConfigService {
  getRuntimeConfig() {
    return DEFAULT_RUNTIME_CONFIG;
  }
}
