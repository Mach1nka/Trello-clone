import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialiseTables1647608611911 implements MigrationInterface {
    name = 'InitialiseTables1647608611911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "position" smallint NOT NULL, "description" character varying NOT NULL DEFAULT '', "column_id" uuid, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "columns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "position" smallint NOT NULL, "board_id" uuid, CONSTRAINT "PK_4ac339ccbbfed1dcd96812abbd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "owner_id" uuid, CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boards_users" ("board_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_5a5a380515f0bd1184c46cc0af3" PRIMARY KEY ("board_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_951541f824c5fbb9bd07996d2e" ON "boards_users" ("board_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_12fac5ea5b88a886fcaca6ef67" ON "boards_users" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_ce7087ed72b4e5e5a0c72a8c5aa" FOREIGN KEY ("column_id") REFERENCES "columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "columns" ADD CONSTRAINT "FK_3f88407849daf390e93035b15ef" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boards" ADD CONSTRAINT "FK_a20a7418b96eda28e1318408472" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boards_users" ADD CONSTRAINT "FK_951541f824c5fbb9bd07996d2e5" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "boards_users" ADD CONSTRAINT "FK_12fac5ea5b88a886fcaca6ef670" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "boards_users" DROP CONSTRAINT "FK_12fac5ea5b88a886fcaca6ef670"`);
        await queryRunner.query(`ALTER TABLE "boards_users" DROP CONSTRAINT "FK_951541f824c5fbb9bd07996d2e5"`);
        await queryRunner.query(`ALTER TABLE "boards" DROP CONSTRAINT "FK_a20a7418b96eda28e1318408472"`);
        await queryRunner.query(`ALTER TABLE "columns" DROP CONSTRAINT "FK_3f88407849daf390e93035b15ef"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_ce7087ed72b4e5e5a0c72a8c5aa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_12fac5ea5b88a886fcaca6ef67"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_951541f824c5fbb9bd07996d2e"`);
        await queryRunner.query(`DROP TABLE "boards_users"`);
        await queryRunner.query(`DROP TABLE "boards"`);
        await queryRunner.query(`DROP TABLE "columns"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
