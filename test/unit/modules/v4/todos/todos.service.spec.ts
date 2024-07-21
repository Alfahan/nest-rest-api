import { Test, TestingModule } from '@nestjs/testing';
import { ICustomRequest } from '@app/libraries/customRequest';
import { Response } from 'express';
import { Pagination } from '@app/common/pagination';
import { TodoService } from '@app/modules/v4/todos/todos.service';
import { TodoRepository } from '@app/modules/v4/todos/repositories/todos.repository';
import { Todo } from '@app/entities/todo.entity';

describe('TodoService', () => {
	let service: TodoService;
	let repository: TodoRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TodoService,
				{
					provide: TodoRepository,
					useValue: {
						findById: jest.fn(),
						getListPagination: jest.fn(),
						save: jest.fn(),
						safeDeleteById: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<TodoService>(TodoService);
		repository = module.get<TodoRepository>(TodoRepository);
	});

	describe('read', () => {
		it('should call repository.findById with the correct id', async () => {
			const id = 'test-id';
			const req: ICustomRequest = {
				params: { id },
				get: jest.fn(),
				header: jest.fn(),
				accepts: jest.fn(),
				acceptsCharsets: jest.fn(),
				acceptsEncodings: jest.fn(),
				acceptsLanguages: jest.fn(),
				range: jest.fn(),
			} as any;
			const expectedData = {} as Todo;
			jest.spyOn(repository, 'findById').mockResolvedValue(expectedData);

			const result = await service.read(req);

			expect(repository.findById).toHaveBeenCalledWith(id);
			expect(result).toBe(expectedData);
		});
	});

	describe('findById', () => {
		it('should call repository.findById with the correct id', async () => {
			const id = 'test-id';
			const expectedData = {} as Todo;
			jest.spyOn(repository, 'findById').mockResolvedValue(expectedData);

			const result = await service.findById(id);

			expect(repository.findById).toHaveBeenCalledWith(id);
			expect(result).toBe(expectedData);
		});
	});

	describe('readAll', () => {
		it('should call repository.getListPagination with the correct parameters', async () => {
			const page = 1;
			const limit = 10;
			const search = 'test';
			const req: ICustomRequest = {
				params: { page, limit, search },
			} as any;
			const expectedData = {} as Pagination<Todo>;
			jest.spyOn(repository, 'getListPagination').mockResolvedValue(
				expectedData,
			);

			const result = await service.readAll(req);

			expect(repository.getListPagination).toHaveBeenCalledWith(
				page,
				limit,
				search,
			);
			expect(result).toBe(expectedData);
		});
	});

	describe('create', () => {
		it('should call repository.save with the correct data', async () => {
			const req = { body: {} } as ICustomRequest;
			const res = {
				locals: { logged: { name: 'test-user' } },
			} as unknown as Response<any, Record<string, any>>;
			const expectedData = {} as Todo;
			jest.spyOn(repository, 'save').mockResolvedValue(expectedData);

			const result = await service.create(req, res);

			expect(repository.save).toHaveBeenCalledWith(req.body);
			expect(result).toBe(expectedData);
		});
	});

	describe('update', () => {
		it('should call repository.save with the updated data', async () => {
			const id = 'test-id';
			const req: ICustomRequest = {
				params: { id },
				body: {},
			} as any;
			const res = {
				locals: { logged: { name: 'test-user' } },
			} as unknown as Response<any, Record<string, any>>;
			const existingTodo = {} as Todo;
			const updatedTodo = {
				updated_by: 'test-user',
			} as Todo;
			jest.spyOn(service, 'findById').mockResolvedValue(
				existingTodo,
			);
			jest.spyOn(repository, 'save').mockResolvedValue(updatedTodo);

			const result = await service.update(req, res);

			expect(service.findById).toHaveBeenCalledWith(id);
			expect(repository.save).toHaveBeenCalledWith(updatedTodo);
			expect(result).toBe(updatedTodo);
		});
	});

	describe('delete', () => {
		it('should call repository.safeDeleteById with the correct parameters', async () => {
			const id = 'test-id';
			const req: ICustomRequest = { params: { id } } as any;
			const res = {
				locals: { logged: { name: 'test-user' } },
			} as unknown as Response<any, Record<string, any>>;

			await service.delete(req, res);

			expect(repository.safeDeleteById).toHaveBeenCalledWith(
				id,
				'test-user',
				'test-user',
			);
		});
	});
});
