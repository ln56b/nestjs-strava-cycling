import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterActivityOptionalColumnsMigration1753203959411
  implements MigrationInterface
{
  name = 'AlterActivityOptionalColumnsMigration1753203959411';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity" ALTER COLUMN "elev_high" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ALTER COLUMN "elev_low" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity" ALTER COLUMN "elev_low" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ALTER COLUMN "elev_high" SET NOT NULL`,
    );
  }
}
