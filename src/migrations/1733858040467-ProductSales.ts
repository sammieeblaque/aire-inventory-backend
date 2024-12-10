import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductSales1733858040467 implements MigrationInterface {
  name = 'ProductSales1733858040467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sale" ADD "costValue" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD "startValue" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "costStuffclear" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "costStuffclear"`,
    );
    await queryRunner.query(`ALTER TABLE "sale" DROP COLUMN "startValue"`);
    await queryRunner.query(`ALTER TABLE "sale" DROP COLUMN "costValue"`);
  }
}
