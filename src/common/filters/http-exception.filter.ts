
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from 'src/common/api-response';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		// const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const res = exception.getResponse();
	
		// custom response
		ApiResponse.fail(
			response,
			res['data'],
			{
				httpCode: status,
				fabdCode: res['fabdCode'],
				message: res['message'],
			},
			res['error']
		)

	}
}
