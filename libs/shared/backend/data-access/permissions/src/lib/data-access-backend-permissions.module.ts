import { Module } from '@nestjs/common';
import { Permission } from './permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [],
  exports: [TypeOrmModule],
})
export class DataAccessBackendPermissionsModule {}
