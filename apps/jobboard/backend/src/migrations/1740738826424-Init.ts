import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1740738826424 implements MigrationInterface {
  name = 'Init1740738826424';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"),
                CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT false,
                "password" character varying,
                "access_token" character varying,
                "refresh_token" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "permissions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "action" character varying NOT NULL,
                "subject" character varying NOT NULL,
                "conditions" jsonb,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"),
                CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "roles_permissions_permissions" (
                "roles_id" uuid NOT NULL,
                "permissions_id" uuid NOT NULL,
                CONSTRAINT "PK_58cb0486653ecb1cfec7b2d9733" PRIMARY KEY ("roles_id", "permissions_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_b8dedd64100fd607eaae3907ab" ON "roles_permissions_permissions" ("roles_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_35f451c91e5274df9bf05479ab" ON "roles_permissions_permissions" ("permissions_id")
        `);
    await queryRunner.query(`
            CREATE TABLE "users_roles_roles" (
                "users_id" uuid NOT NULL,
                "roles_id" uuid NOT NULL,
                CONSTRAINT "PK_8b06e2ba94474e062a02081be61" PRIMARY KEY ("users_id", "roles_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_76bfcdfc62322ea0a088cea9ef" ON "users_roles_roles" ("users_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_1ab50aa885c7b2a4de17b48d3d" ON "users_roles_roles" ("roles_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "roles_permissions_permissions"
            ADD CONSTRAINT "FK_b8dedd64100fd607eaae3907ab8" FOREIGN KEY ("roles_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "roles_permissions_permissions"
            ADD CONSTRAINT "FK_35f451c91e5274df9bf05479ab2" FOREIGN KEY ("permissions_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "users_roles_roles"
            ADD CONSTRAINT "FK_76bfcdfc62322ea0a088cea9efc" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "users_roles_roles"
            ADD CONSTRAINT "FK_1ab50aa885c7b2a4de17b48d3d9" FOREIGN KEY ("roles_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_1ab50aa885c7b2a4de17b48d3d9"
        `);
    await queryRunner.query(`
            ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_76bfcdfc62322ea0a088cea9efc"
        `);
    await queryRunner.query(`
            ALTER TABLE "roles_permissions_permissions" DROP CONSTRAINT "FK_35f451c91e5274df9bf05479ab2"
        `);
    await queryRunner.query(`
            ALTER TABLE "roles_permissions_permissions" DROP CONSTRAINT "FK_b8dedd64100fd607eaae3907ab8"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_1ab50aa885c7b2a4de17b48d3d"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_76bfcdfc62322ea0a088cea9ef"
        `);
    await queryRunner.query(`
            DROP TABLE "users_roles_roles"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_35f451c91e5274df9bf05479ab"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_b8dedd64100fd607eaae3907ab"
        `);
    await queryRunner.query(`
            DROP TABLE "roles_permissions_permissions"
        `);
    await queryRunner.query(`
            DROP TABLE "permissions"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TABLE "roles"
        `);
  }
}
