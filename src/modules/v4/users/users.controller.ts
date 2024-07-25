import { BadRequestException, Controller, Get, HttpException, HttpStatus, Post, Put, Query, Req, Res } from "@nestjs/common";
import { UserService } from "./users.service";
import { ApiResponse } from "@app/common/api-response";
import { Request, Response } from "express";
import { successMessageCode } from "@app/common/api-response/consts/success-message-code";
import { errorMessageCode } from "@app/common/api-response/consts/error-message-code";
import { Pagination } from "@app/utils/pagination";
import { ParamsUser } from "./dto/paramUser.dto";


@Controller({ version: '4', path: 'users' })
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async create(
        @Res() res: Response,
        @Req() req: Request
    ): Promise<any> {
        try {
            const data = await this.userService.create(req);
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

    @Put('/:id')
    async update(
        @Res() res: Response,
        @Req() req: Request,
    ): Promise<Response> {
        try {
            const data = await this.userService.update(req);
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

    @Get('/:id')
    async read(
        @Res() res: Response,
        @Req() req: Request
    ): Promise<Response> {
        try {
            const data = await this.userService.read(req);
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
    async findAll(
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('key') key: string,
        @Query('value') value: string,
        @Res() res: Response,
    ): Promise<Response> {
        try {
             // Validate and parse pagination parameters
            const pageNumber = parseInt(page, 10) || 1;
            const limitNumber = parseInt(limit, 10) || 10;
            if (isNaN(pageNumber) || isNaN(limitNumber)) {
            throw new BadRequestException('Invalid pagination parameters');
            }

            const pagination = new Pagination();
            pagination.limit = limitNumber;
            pagination.offset = (pageNumber - 1) * limitNumber;

            const params = new ParamsUser();
            params.key = key || '';
            params.value = value || '';
            const data = await this.userService.findAll(pagination, params);
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
    		)
        }
    }
}