import { Injectable } from "@nestjs/common";
import { UserAbstract } from "./users.abstract";
import CryptoTs from "pii-agent-ts";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from "./repositories/users.repository";
import { User } from "@app/entities/user.entity";
import { isEmpty, isNotEmpty } from "class-validator";
import { error } from "console";

@Injectable()
export class UserService implements UserAbstract{
    constructor(
        @InjectDataSource() private dataSource: DataSource,
        private userRepository: UserRepository
    ) {}

    async create(req: any) {
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

    async update(req: any) {
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

        const update = await this.userRepository.update(payload, {id: id});

        return update
    }

    async read(req: any) {
        const id = req.params.id;

        const data = await this.userRepository.findById(id);

        console.log(data);

        const result = {
            id: data.id,
            name: CryptoTs.decryptWithAes('AES_256_CBC', data.name),
            email: CryptoTs.decryptWithAes('AES_256_CBC', data.email),
            address: CryptoTs.decryptWithAes('AES_256_CBC', data.address),
            age: data.age,
            password: data.password
        }
        
        return result;
    }
}