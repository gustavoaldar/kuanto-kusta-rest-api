import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1621183315602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'users',
                    columns: [
                        {
                            name: 'userId',
                            type: 'uuid',
                            isPrimary: true
                        },
                        {
                            name: 'name',
                            type: 'varchar'
                        },
                        {
                            name: 'email',
                            type: 'varchar',
                            isUnique: true
                        },
                        {
                            name: 'password',
                            type: 'varchar'
                        }
                    ]
                })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
