import { User } from "@app/entities/user.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { UserRepository } from "./repositories/users.repository";


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [
        UserController
    ],
    exports: [
        UserService, 
        UserRepository
    ],
    providers: [
        UserService, 
        UserRepository
    ],
})

export class UsersModule {}