import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from '@app/modules/v4/todos/todos.controller'
import { TodoService } from '@app/modules/v4/todos/todos.service';
import { ApiResponse } from '@app/common/api-response';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TodoRepository } from '@app/modules/v4/todos/repositories/todos.repository';
import { Todo } from '@app/entities/todo.entity';
import { successMessageCode } from '@app/common/api-response/consts/success-message-code';
import { errorMessageCode } from '@app/common/api-response/consts/error-message-code';


describe('TodoController', () => {
	let controller: TodoController;
	let service: TodoService;
	let mockDataSource: any;

	const mockEntityManager = {
		find: jest.fn(),
		save: jest.fn(),
	}

	beforeEach(async () => {
		mockDataSource = {
			locals: { name: 'testing' },
			createEntityManager: jest.fn().mockReturnValue(mockEntityManager),
		};
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TodoController],
			providers: [
				TodoService,
				TodoRepository,
				{ provide: DataSource, useValue: mockDataSource },
			],
		}).compile();

		controller = module.get<TodoController>(TodoController);
		service = module.get<TodoService>(TodoService);
	});

	describe('create', () => {
		it('should return a success response with the created data', async () => {
			const req = {} as any;
			const res = {} as any;
			const data = {} as Todo;

			jest.spyOn(service, 'create').mockResolvedValue(data);
			jest.spyOn(ApiResponse, 'success').mockReturnValue(res as any);

			const result = await controller.create(res, req);

			expect(ApiResponse.success).toHaveBeenCalledWith(
				res,
				data,
				successMessageCode.SC0011,
			);
			expect(result).toBe(res);
		});

		it('should return a fail response with the error message and stack trace', async () => {
			const req = {} as any;
			const res = {} as any;
			const error = new Error('Test error');

			jest.spyOn(service, 'create').mockRejectedValue(error);
			jest.spyOn(ApiResponse, 'fail').mockReturnValue(res as any);

			try {
				await controller.create(res, req);
			} catch (e) {
				expect(ApiResponse.fail).toHaveBeenCalledWith(
					res,
					error.message,
					errorMessageCode.ER0010,
					error.stack,
				);
				expect(e).toBeInstanceOf(Error);
				expect(e.message).toBe(error.message);
				expect(e.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		});
	});

	describe('read', () => {
		it('should return a success response with the data returned by the service', async () => {
			// Arrange
			const req = {} as any;
			const res = {} as any;
			const data = {
				id: 'd05f74e5-7677-410b-be15-a23c573fcfc3',
			} as Todo;
			jest.spyOn(service, 'read').mockResolvedValue(data);
			const successSpy = jest.spyOn(ApiResponse, 'success');

			// Act
			const result = await controller.read(res, req);

			// Assert
			expect(successSpy).toHaveBeenCalledWith(
				{},
				data,
				successMessageCode.SC0012,
			);
			expect(result).toEqual(successSpy.mock.results[0].value);
		});

		it('should return a fail response with the error message and stack trace', async () => {
			// Arrange
			const req = {} as any;
			const res = {} as any;
			const error = new Error('test-error');
			jest.spyOn(service, 'read').mockRejectedValue(error);
			const failSpy = jest.spyOn(ApiResponse, 'fail');

			// Act
			const result = await controller.read(res, req);

			// Assert
			expect(failSpy).toHaveBeenCalledWith(
				{},
				error.message,
				errorMessageCode.ER0010,
				error.stack,
			);
			expect(result).toEqual(failSpy.mock.results[0].value);
		});
	});

	describe('update', () => {
		it('should be success updated data', async () => {
			const req = {} as any;
			const res = {} as any;
			const data = {
				id: 'd05f74e5-7677-410b-be15-a23c573fcfc3',
			} as Todo;
			jest.spyOn(service, 'update').mockResolvedValue(data);
			const successSpy = jest.spyOn(ApiResponse, 'success');
			const result = await controller.update(res, req);
			expect(successSpy).toHaveBeenCalledWith(
				res,
				data,
				successMessageCode.SC0014,
			);
			expect(result).toEqual(successSpy.mock.results[0].value);
		});

		it('should return a failed response with the error message and stack trace', async () => {
			// Arrange
			const req = {} as any;
			const res = {} as any;
			const error = new Error('test-error');
			jest.spyOn(service, 'update').mockRejectedValue(error);
			const failSpy = jest.spyOn(ApiResponse, 'fail');

			const result = await controller.update(res, req);

			expect(failSpy).toHaveBeenCalledWith(
				res,
				error.message,
				errorMessageCode.ER0010,
				error.stack,
			);
			expect(result).toEqual(failSpy.mock.results[0].value);
		});

		it('should throw an HttpException if the error is not an instance of Error', async () => {
			// Arrange
			const req = {} as any;
			const res = {} as any;
			const error = 'Http Exception';
			jest.spyOn(service, 'update').mockRejectedValue(error);

			try {
				await controller.update(res, req);
			} catch (e) {
				expect(e).toBeInstanceOf(HttpException);
				expect(e.message).toBe(error);
				expect(e.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		});
	});

	describe('delete', () => {
		it('should be success deleted data', async () => {
			const req = {} as any;
			const res = {} as any;
			const data = {
				id: 'd05f74e5-7677-410b-be15-a23c573fcfc3'
			} as Todo;
			jest.spyOn(service, 'update').mockResolvedValue(data);
			const successSpy = jest.spyOn(ApiResponse, 'success');
			const result = await controller.delete(res, req);
			expect(successSpy).toHaveBeenCalledWith(
				res,
				data,
				successMessageCode.SC0013,
			);
			expect(result).toEqual(successSpy.mock.results[0].value);
		});

		it('should return a failed response with the error message and stack trace', async () => {
			// Arrange
			const req = {} as any;
			const res = {} as any;
			const error = new Error('test-error');
			jest.spyOn(service, 'update').mockRejectedValue(error);
			const failSpy = jest.spyOn(ApiResponse, 'fail');

			const result = await controller.delete(res, req);

			expect(failSpy).toHaveBeenCalledWith(
				res,
				error.message,
				errorMessageCode.ER0010,
				error.stack,
			);
			expect(result).toEqual(failSpy.mock.results[0].value);
		});

		it('should be throw an HttpException if the error is not an instance of Error', async () => {
			// Arrange
			const req = {} as any;
			const res = {} as any;
			const error = 'Http Exception';
			jest.spyOn(service, 'update').mockRejectedValue(error);

			try {
				await controller.delete(res, req);
			} catch (e) {
				expect(e).toBeInstanceOf(HttpException);
				expect(e.message).toBe(error);
				expect(e.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		});
	});

	describe('readAll', () => {
		it('should return a success response with the data returned by the service', async () => {
			const req = {} as any;
			const res = {} as any;
			const data = [
				{ id: 'd05f74e5-7677-410b-be15-a23c573fcfc3'},
				{ id: 'd05f74e5-7677-410b-be15-a23c573fcfc4'},
			] as Todo[];
			jest.spyOn(service, 'readAll').mockResolvedValue(data as any);
			const successSpy = jest.spyOn(ApiResponse, 'success');

			const result = await controller.readAll(res, req);

			expect(successSpy).toHaveBeenCalledWith(
				{},
				data,
				successMessageCode.SC0012,
			);
			expect(result).toEqual(successSpy.mock.results[0].value);
		});
		it('should be return a fail response', async () => {
			const req = {} as any;
			const res = {} as any;
			const error = new Error('test-error');
			jest.spyOn(service, 'readAll').mockRejectedValue(error);
			const failSpy = jest.spyOn(ApiResponse, 'fail');

			const result = await controller.readAll(res, req);

			expect(failSpy).toHaveBeenCalledWith(
				res,
				error.message,
				errorMessageCode.ER0010,
				error.stack,
			);
			expect(result).toEqual(failSpy.mock.results[0].value);
		});
		it('should throw an exception if the error is not an instance of Error', async () => {
			const req = {} as any;
			const res = {} as any;
			const error = 'Http Exception';
			jest.spyOn(service, 'readAll').mockRejectedValue(error);

			try {
				await controller.readAll(res, req);
			} catch (e) {
				expect(e).toBeInstanceOf(HttpException);
				expect(e.message).toBe(error);
				expect(e.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		});
	});
})