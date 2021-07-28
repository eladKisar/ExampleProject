import {MigrationInterface, QueryRunner} from "typeorm";

export class UserChange1627490085842 implements MigrationInterface {
    name = 'UserChange1627490085842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userName" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userEmail" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userEmail"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" nvarchar(255) NOT NULL`);
    }

}
