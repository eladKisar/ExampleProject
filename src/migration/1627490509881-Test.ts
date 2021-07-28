import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1627490509881 implements MigrationInterface {
    name = 'Test1627490509881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userName" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userEmail" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userRole" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userRole"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userEmail"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" nvarchar(255) NOT NULL`);
    }

}
