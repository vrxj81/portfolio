import { Module } from '@nestjs/common';
import { Permission } from './permission.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Permission] })],
  providers: [],
  exports: [MikroOrmModule],
})
export class DataAccessBackendPermissionsModule {}
