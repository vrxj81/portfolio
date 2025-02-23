import { Module } from '@nestjs/common';
import { Role } from './role.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Role] })],
  providers: [],
  exports: [MikroOrmModule],
})
export class DataAccessBackendRolesModule {}
