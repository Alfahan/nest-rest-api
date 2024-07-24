import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1721547172948 implements MigrationInterface {
    name = ' $npmConfigName1721547172948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" bytea NOT NULL, "email" bytea NOT NULL, "address" bytea NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "name_text_heap" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "hash" character varying NOT NULL, CONSTRAINT "PK_71ee3e36c8f22eed301f56ada02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todos" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL DEFAULT '1', "created_name" character varying NOT NULL DEFAULT 'System', "updated_at" TIMESTAMP DEFAULT now(), "updated_by" character varying, "updated_name" character varying, "deleted_at" TIMESTAMP, "deleted_by" character varying, "deleted_name" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "email_text_heap" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "hash" character varying NOT NULL, CONSTRAINT "PK_403649abdb24b9c7598045628ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address_text_heap" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "hash" character varying NOT NULL, CONSTRAINT "PK_228f0436c1bed1112c77a6fcabd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "address_text_heap"`);
        await queryRunner.query(`DROP TABLE "email_text_heap"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`DROP TABLE "name_text_heap"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
