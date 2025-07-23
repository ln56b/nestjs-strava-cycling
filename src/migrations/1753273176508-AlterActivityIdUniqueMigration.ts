import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterActivityIdUniqueMigration1753273176508
  implements MigrationInterface
{
  name = 'lterActivityIdUniqueMigration1753273176508';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "UQ_24625a1d6b1b089c8ae206fe467" UNIQUE ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "UQ_24625a1d6b1b089c8ae206fe467"`,
    );
  }
}
