import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import {
  EntityRepository,
  FilterQuery,
  FindAllOptions,
  FindOneOptions,
} from '@mikro-orm/core';
import { CreateUserDto, UpdateUserDto } from '@portfolio/common-dtos';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: EntityRepository<User>,
  ) {}

  getUsers(where: FilterQuery<User> = {}, options: FindAllOptions<User> = {}): Promise<User[]> {
    return this.usersRepository.find(where, options);
  }

  async getUser(
    where: FilterQuery<User> = {},
    options: FindOneOptions<User> = {},
  ): Promise<User> {
    const user = await this.usersRepository.findOne(where, options);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(data, { partial: true });
    this.usersRepository.getEntityManager().persistAndFlush(newUser);
    return newUser;
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.usersRepository.assign(user, data);
    await this.usersRepository.getEntityManager().persistAndFlush(user);
    return user;
  }

  async deleteUser(id: string): Promise<string> {
    const deletedUser = await this.getUser({ id });
    await this.usersRepository.getEntityManager().removeAndFlush(deletedUser);
    return id;
  }
}
