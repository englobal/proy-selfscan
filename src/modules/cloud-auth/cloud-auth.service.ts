import { Injectable } from '@nestjs/common';
import { CloudAuthRequestDto } from './dto/cloud-auth-request.dto';

@Injectable()
export class CloudAuthService {
  authenticate(_dto: CloudAuthRequestDto) {
    return {
      token: 'mock-token',
      expiresIn: 3600,
    };
  }
}
