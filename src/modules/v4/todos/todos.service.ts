import { Injectable } from '@nestjs/common';
import { TodoRepository } from './repositories/todos.repository';
import { TodoAbstract } from './todos.abstract';
import { Response } from 'express';

@Injectable()
export class TodoService implements TodoAbstract {
	constructor(private todoRepository: TodoRepository) {}

	async create(req: any, res: Response) {
		const logged: any = res.locals.logged;
		const body = req.body;
		body.created_by = logged?.user_id ?? 'SYSTEM';
		body.updated_by = logged?.name ?? 'SYSTEM';
		return await this.todoRepository.save(req.body);
	}

	async read(req: any) {
		const id = req.params.id;
		const data = await this.todoRepository.findById(id);
		return data;
	}

	async readAll(req: any) {
		const { page, limit, search} : any = req.params;
		return await this.todoRepository.getListPagination(page, limit, search);
	}

	async findById(id: string) {
		const data = await this.todoRepository.findById(id);
		return data;
	}
    
	async update(req: any, res: Response) {
		const id = req.params.id;
		const body = req.body;

		const logged : any = res.locals.logged;
		const existingPermission = await this.findById(id);
		body.updated_by = logged?.name ?? 'SYSTEM';

		const updatedPermission = { ...existingPermission, ...body };
		return await this.todoRepository.save(updatedPermission);
	}

	async delete(req: any, res: Response): Promise<void> {
		const id = req.params.id;
		const logged: any = res.locals.logged;
		await this.todoRepository.safeDeleteById(id, logged.name, logged.name);
	}

}