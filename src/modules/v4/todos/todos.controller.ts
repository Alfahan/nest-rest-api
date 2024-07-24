import { Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { TodoService } from './todos.service';
import { Response } from 'express';
import { ApiResponse } from '@app/common/api-response';
import { errorMessageCode } from '@app/common/api-response/consts/error-message-code';
import { successMessageCode } from '@app/common/api-response/consts/success-message-code';

@Controller({ path: 'todos', version: '4' })
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

    @Post()
	async create(
        @Res() res: Response,
        @Req() req: Request
	): Promise<Response> {
		try {
			const data = await this.todoService.create(req, res);
			return ApiResponse.success(res, data, successMessageCode.SC0011);
		} catch (error) {
			if (error instanceof Error) {
				return ApiResponse.fail(
					res,
					error.message,
					errorMessageCode.ER0010,
					error.stack,
				);
			}

			throw new HttpException(
				error.message,
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

    @Get('/:id')
    async read(
        @Res() res: Response,
        @Req() req: Request
    ): Promise<Response> {
    	try {
    		const data = await this.todoService.read(req);
    		return ApiResponse.success(res, data, successMessageCode.SC0012);
    	} catch (error) {
    		if (error instanceof Error) {
    			return ApiResponse.fail(
    				res,
    				error.message,
    				errorMessageCode.ER0010,
    				error.stack,
    			);
    		}

    		throw new HttpException(
    			error.message,
    			HttpStatus.INTERNAL_SERVER_ERROR,
    		);
    	}
    }

    @Get()
    async readAll(
        @Res() res: Response,
        @Req() req: Request
    ): Promise<Response> {
    	try {
    		const data = await this.todoService.readAll(req);
    		return ApiResponse.success(res, data, successMessageCode.SC0012);
    	} catch (error) {
    		if (error instanceof Error) {
    			return ApiResponse.fail(
    				res,
    				error.message,
    				errorMessageCode.ER0010,
    				error.stack,
    			);
    		}

    		throw new HttpException(
    			error.message,
    			HttpStatus.INTERNAL_SERVER_ERROR,
    		);
    	}
    }

    @Put('/:id')
    async update(
        @Res() res: Response,
        @Req() req: Request
    ): Promise<Response> {
    	try {
    		const data = await this.todoService.update(req, res);
    		return ApiResponse.success(res, data, successMessageCode.SC0014);
    	} catch (error) {
    		if (error instanceof Error) {
    			return ApiResponse.fail(
    				res,
    				error.message,
    				errorMessageCode.ER0010,
    				error.stack,
    			);
    		}

    		throw new HttpException(
    			error.message,
    			HttpStatus.INTERNAL_SERVER_ERROR,
    		);
    	}
    }

    @Delete('/:id')
    async delete(
        @Res() res: Response,
        @Req() req: Request
    ): Promise<Response> {
    	try {
    		const data = await this.todoService.update(req, res);
    		return ApiResponse.success(res, data, successMessageCode.SC0013);
    	} catch (error) {
    		if (error instanceof Error) {
    			return ApiResponse.fail(
    				res,
    				error.message,
    				errorMessageCode.ER0010,
    				error.stack,
    			);
    		}

    		throw new HttpException(
    			error.message,
    			HttpStatus.INTERNAL_SERVER_ERROR,
    		);
    	}
    }
}