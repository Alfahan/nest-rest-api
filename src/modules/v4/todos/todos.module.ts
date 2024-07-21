import { Todo } from '@app/entities/todo.entity';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todos.controller';
import { TodoService } from './todos.service';
import { TodoRepository } from './repositories/todos.repository';

@Module({
	imports: [TypeOrmModule.forFeature([Todo])],
	controllers: [TodoController],
	exports: [TodoService, TodoRepository],
	providers: [TodoService, TodoRepository]
})
export class TodoModule implements NestModule {
	// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
	configure(_consumer: MiddlewareConsumer) {}
}