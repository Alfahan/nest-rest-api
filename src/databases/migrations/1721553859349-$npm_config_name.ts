import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1721553859349 implements MigrationInterface {
    name = ' $npmConfigName1721553859349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name_bidx"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email_bidx"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address_bidx"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bidx_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bidx_email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bidx_address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bidx_address"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bidx_email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bidx_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "address_bidx" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email_bidx" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name_bidx" character varying NOT NULL`);
    }

}
