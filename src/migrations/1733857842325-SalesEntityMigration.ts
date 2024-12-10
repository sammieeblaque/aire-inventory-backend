import { MigrationInterface, QueryRunner } from 'typeorm';

export class SalesEntityMigration1733857842325 implements MigrationInterface {
  name = 'SalesEntityMigration1733857842325';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sale" ADD "costValue" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD "startValue" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sale" DROP COLUMN "startValue"`);
    await queryRunner.query(`ALTER TABLE "sale" DROP COLUMN "costValue"`);
  }
}
