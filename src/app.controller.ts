import { Controller, Get, Res } from '@nestjs/common';
import { ApiResponse } from './common/api-response';
import { Response } from 'express';
import { successMessageCode } from './common/api-response/consts/success-message-code';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {

	constructor(private configService: ConfigService) {}

	@Get()
	index(@Res() response: Response): Response {
		const message = `Service ${this.configService.get('APP_NAME')} is running.`;
		return ApiResponse.success(
			response,
			message,
			successMessageCode.SC0015,
		);
	}
}