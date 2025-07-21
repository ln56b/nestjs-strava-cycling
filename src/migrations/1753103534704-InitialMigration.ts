import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1753103534704 implements MigrationInterface {
  name = 'InitialMigration1753103534704';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "theme" character varying NOT NULL DEFAULT 'dark', "strava_access_token" character varying, "strava_code" character varying, "last_login" TIMESTAMP, "athleteId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "activity" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "id" bigint NOT NULL, "athleteId" integer NOT NULL, "name" character varying NOT NULL, "achievement_count" integer NOT NULL, "athlete_count" integer NOT NULL, "average_speed" double precision NOT NULL, "average_watts" double precision, "commute" boolean NOT NULL, "distance" double precision NOT NULL, "elapsed_time" integer NOT NULL, "elev_high" double precision NOT NULL, "elev_low" double precision NOT NULL, "external_id" character varying NOT NULL, "flagged" boolean NOT NULL, "gear_id" character varying, "location_city" character varying, "location_country" character varying, "location_state" character varying, "max_speed" double precision NOT NULL, "max_watts" double precision, "moving_time" integer NOT NULL, "private" boolean NOT NULL, "sport_type" character varying NOT NULL, "start_date" character varying NOT NULL, "start_date_local" character varying NOT NULL, "timezone" character varying NOT NULL, "total_elevation_gain" double precision NOT NULL, "trainer" boolean NOT NULL, "type" character varying NOT NULL, "utc_offset" integer NOT NULL, "visibility" character varying NOT NULL, "workout_type" integer, CONSTRAINT "PK_d848e62c1a30e6fd2091b935c43" PRIMARY KEY ("uuid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "activity"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
