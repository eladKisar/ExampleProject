import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1627498189715 implements MigrationInterface {
    name = 'Test1627498189715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_RENAME 'users.email' , 'userEmail', 'COLUMN'`);
        await queryRunner.query(`EXEC sp_RENAME 'users.role' , 'userRole', 'COLUMN'`);
        await queryRunner.query(`EXEC sp_RENAME 'users.name' , 'userName', 'COLUMN'`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_RENAME 'users.userEmail' , 'email', 'COLUMN'`);
        await queryRunner.query(`EXEC sp_RENAME 'users.userRole' , 'role', 'COLUMN'`);
        await queryRunner.query(`EXEC sp_RENAME 'users.userName' , 'name', 'COLUMN'`);
    }

}
