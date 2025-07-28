import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterGearNotifyThresholdMigration1753709400089
  implements MigrationInterface
{
  name = 'AlterGearNotifyThresholdMigration1753709400089';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "gear" ADD "stopNotifications" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "gear" ADD "notifyThreshold" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "gear" DROP COLUMN "notifyThreshold"`);
    await queryRunner.query(
      `ALTER TABLE "gear" DROP COLUMN "stopNotifications"`,
    );
  }
}
