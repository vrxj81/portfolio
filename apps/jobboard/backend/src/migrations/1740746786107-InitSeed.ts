import { IRole } from '@portfolio/common-models';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSeed1740746786107 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleRepository = queryRunner.manager.getRepository<IRole>('Role');

    await roleRepository.save(
      await roleRepository.create({
        name: 'recruiter',
        description: 'Recruiter role',
      }),
    );

    await roleRepository.save(
      await roleRepository.create({
        name: 'jobseeker',
        description: 'Job seeker role',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('Role').delete({});
  }
}
