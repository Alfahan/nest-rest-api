import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1721566391857 implements MigrationInterface {
    name = ' $npmConfigName1721566391857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer DEFAULT '25'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
    }

}
