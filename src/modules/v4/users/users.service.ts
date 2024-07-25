import { Injectable } from "@nestjs/common";
import { UserAbstract } from "./users.abstract";
import CryptoTs from "pii-agent-ts";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { UserRepository } from "./repositories/users.repository";
import { User } from "@app/entities/user.entity";
import { isEmpty } from "class-validator";
import { Request } from "express";
import { Pagination } from "@app/utils/pagination";
import { ParamsUser } from "./dto/paramUser.dto";

@Injectable()
export class UserService implements UserAbstract{
    constructor(
        @InjectDataSource() private dataSource: DataSource,
        private userRepository: UserRepository
    ) {}

    async create(req: Request) {
        // // without aesCipher
        // const payload = new User();
        // payload.id = uuidv4();
        // payload.name = req.body.name;
        // payload.email = req.body.email;
        // payload.address = req.body.address;
        // payload.password = req.body.password;
        // payload.age = req.body.age;

        // const pii = await CryptoTs.buildBlindIndex(this.dataSource, payload);

        // await this.userRepository.save(pii)

        // const { password, ...result } = req.body

        // result.id = payload.id;

        // return result

        // with aesCipher
        const pii = new User();
        pii.name = CryptoTs.encryptWithAes('AES_256_CBC', req.body.name);
        pii.email = CryptoTs.encryptWithAes('AES_256_CBC', req.body.email);
        pii.address = CryptoTs.encryptWithAes('AES_256_CBC', req.body.address);

        const blindIdx = await CryptoTs.buildBlindIndex(this.dataSource, pii);

        const { password, age } = req.body;

        const payload = {
            name: blindIdx.name,
            name_bidx: blindIdx.name_bidx,
            email: blindIdx.email,
            email_bidx: blindIdx.email_bidx,
            address: blindIdx.address,
            address_bidx: blindIdx.address_bidx,
            password: password,
            age: age,
        }

        await this.userRepository.save(payload)

        return req.body;     

    }

    async update(req: Request) {
        const id = req.params.id;
        const find = await this.userRepository.findById(id);

        if (isEmpty(find)) {
            throw new Error('Unsupported encryption type');
        }
        
        const pii = new User();
        pii.name = CryptoTs.encryptWithAes('AES_256_CBC', req.body.name);
        pii.email = CryptoTs.encryptWithAes('AES_256_CBC', req.body.email);
        pii.address = CryptoTs.encryptWithAes('AES_256_CBC', req.body.address);

        const blindIdx = await CryptoTs.buildBlindIndex(this.dataSource, pii);

        const { password, age } = req.body;

        const payload = {
            name: blindIdx.name,
            name_bidx: blindIdx.name_bidx,
            email: blindIdx.email,
            email_bidx: blindIdx.email_bidx,
            address: blindIdx.address,
            address_bidx: blindIdx.address_bidx,
            password: password,
            age: age,
        }

        const updateResult = await this.userRepository.update(id, payload);

        console.log(updateResult);

        if (updateResult.affected === 0) {
            throw new Error('Failed to update user');
        }

        return updateResult;
    }

    async read(req: Request) {
        const id = req.params.id;
        const result = await this.userRepository.findById(id);
        
        return result;
    }

    async findAll(pagination: Pagination, params: ParamsUser) {
        const result = await this.userRepository.findAll(pagination, params);
        return result;
    }
}