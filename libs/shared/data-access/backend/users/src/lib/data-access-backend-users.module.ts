import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  providers: [UsersRepository],
  exports: [UsersRepository, MikroOrmModule],
})
export class DataAccessBackendUsersModule {}
