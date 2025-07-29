import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1753773385607 implements MigrationInterface {
  name = 'InitialMigration1753773385607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "theme" character varying NOT NULL DEFAULT 'dark', "strava_access_token" character varying, "strava_code" character varying, "last_login" TIMESTAMP, "athleteId" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_6eb8e055d82ac59e2dc3eb99c13" UNIQUE ("athleteId"), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "gear" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" character varying NOT NULL, "primary" boolean NOT NULL, "name" character varying NOT NULL, "distance" integer NOT NULL, "brand" character varying, "model" character varying, "showNotifications" boolean NOT NULL DEFAULT false, "notifyThreshold" integer, "type" character varying NOT NULL, "athleteId" character varying NOT NULL, CONSTRAINT "UQ_f57e90b5a9b1363699e02ffe30c" UNIQUE ("id"), CONSTRAINT "PK_ebe190408d14a6a99ab19b56a12" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "activity" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" bigint NOT NULL, "name" character varying NOT NULL, "achievement_count" integer NOT NULL, "athlete_count" integer NOT NULL, "average_speed" double precision NOT NULL, "average_watts" double precision, "commute" boolean NOT NULL, "distance" double precision NOT NULL, "elapsed_time" integer NOT NULL, "elev_high" double precision, "elev_low" double precision, "external_id" character varying NOT NULL, "flagged" boolean NOT NULL, "gear_id" character varying, "location_city" character varying, "location_country" character varying, "location_state" character varying, "max_speed" double precision NOT NULL, "max_watts" double precision, "moving_time" integer NOT NULL, "private" boolean NOT NULL, "sport_type" character varying NOT NULL, "start_date" character varying NOT NULL, "start_date_local" character varying NOT NULL, "timezone" character varying NOT NULL, "total_elevation_gain" double precision NOT NULL, "trainer" boolean NOT NULL, "type" character varying NOT NULL, "utc_offset" integer NOT NULL, "visibility" character varying NOT NULL, "workout_type" integer, "athleteId" character varying NOT NULL, CONSTRAINT "UQ_24625a1d6b1b089c8ae206fe467" UNIQUE ("id"), CONSTRAINT "PK_d848e62c1a30e6fd2091b935c43" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "gear" ADD CONSTRAINT "FK_f7a65e085fb8f0b658308042997" FOREIGN KEY ("athleteId") REFERENCES "user"("athleteId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_bbc62f864b2e35d162e0c5d2cc7" FOREIGN KEY ("athleteId") REFERENCES "user"("athleteId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_bbc62f864b2e35d162e0c5d2cc7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "gear" DROP CONSTRAINT "FK_f7a65e085fb8f0b658308042997"`,
    );
    await queryRunner.query(`DROP TABLE "activity"`);
    await queryRunner.query(`DROP TABLE "gear"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
