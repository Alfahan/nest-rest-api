import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class KeyAuthGuard extends AuthGuard('key-auth') {}