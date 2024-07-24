import { User } from "@app/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { DataSource, FindOneOptions, Repository } from "typeorm";


@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private datasource: DataSource){
        super(User, datasource.createEntityManager());
    }

    async findById(id: string): Promise<User> {
		const options: FindOneOptions<User> = { where: { id } };
		const result =  await this.findOne(options);
        return result
	}
}