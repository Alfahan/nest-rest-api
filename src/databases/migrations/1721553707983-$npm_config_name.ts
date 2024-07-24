import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1721553707983 implements MigrationInterface {
    name = ' $npmConfigName1721553707983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "name_bidx" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email_bidx" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "address_bidx" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address_bidx"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email_bidx"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name_bidx"`);
    }

}
