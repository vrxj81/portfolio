import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  providers: [],
  exports: [MikroOrmModule],
})
export class DataAccessBackendUsersModule {}
