import { User } from "@app/entities/user.entity";
import { Injectable } from "@nestjs/common";
import CryptoTs from "pii-agent-ts";
import { DataSource, FindOneOptions, Repository } from "typeorm";
import { FetchUserDto } from "../dto/fetchUser.dto";
import { Pagination } from "@app/utils/pagination";
import { ParamsUser } from "../dto/paramUser.dto";


@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private datasource: DataSource){
        super(User, datasource.createEntityManager());
    }

    async findById(id: string): Promise<FetchUserDto> {
		const options: FindOneOptions<User> = { where: { id } };
		const data =  await this.findOne(options);

        const result = {
            id: data.id,
            name: CryptoTs.decryptWithAes('AES_256_CBC', data.name),
            email: CryptoTs.decryptWithAes('AES_256_CBC', data.email),
            address: CryptoTs.decryptWithAes('AES_256_CBC', data.address),
            age: data.age,
        }

        return result
	}

    async findAll(pagination: Pagination, params: ParamsUser): Promise <FetchUserDto[]> {
        let Query = `SELECT name, email, address, age FROM users`;
        const queryParams: any[] = [];

        if (params.key && params.value) {
            if (params.key === 'name') {
                const heaps = await CryptoTs.searchContents(this.datasource, 'name_text_heap', { content: params.value });
                if (heaps.length > 0) {
                  const likeClauses = heaps.map((heap) => {
                    queryParams.push(`%${heap.hash}%`);
                    return `name_bidx LIKE $${queryParams.length}`;
                  });
                  Query += ` WHERE ${likeClauses.join(' OR ')}`;
                }
              }
        }

        Query += pagination.paginateQuery();
        const data = await this.datasource.query(Query, queryParams);

        const users: FetchUserDto[] = []

        for(const dat of data) {
            const user = new FetchUserDto();
            user.id = dat.id;
            user.name =  CryptoTs.decryptWithAes('AES_256_CBC', dat.name);
            user.email = CryptoTs.decryptWithAes('AES_256_CBC', dat.email);
            user.address = CryptoTs.decryptWithAes('AES_256_CBC',dat.address);
            user.age = dat.id;

            users.push(user);
        }

        return users;
    }
}