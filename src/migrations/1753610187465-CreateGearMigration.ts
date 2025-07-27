import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGearMigration1753610187465 implements MigrationInterface {
  name = 'CreateGearMigration1753610187465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gear" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" character varying NOT NULL, "primary" boolean NOT NULL, "name" character varying NOT NULL, "distance" integer NOT NULL, "brand" character varying, "model" character varying, CONSTRAINT "UQ_f57e90b5a9b1363699e02ffe30c" UNIQUE ("id"), CONSTRAINT "PK_ebe190408d14a6a99ab19b56a12" PRIMARY KEY ("uuid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gear"`);
  }
}
