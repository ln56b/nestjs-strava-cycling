import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserAddUsernameMigration1753605280419
  implements MigrationInterface
{
  name = 'AlterUserAddUsernameMigration1753605280419';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
  }
}
