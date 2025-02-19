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
export class UsersRepository extends EntityRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: EntityRepository<User>,
  ) {
    super(usersRepository.getEntityManager(), User.name);
  }

  getUsers(options: FindAllOptions<User> = {}): Promise<User[]> {
    return this.usersRepository.findAll(options);
  }

  async getUser(
    query: FilterQuery<User> = {},
    options: FindOneOptions<User> = {},
  ): Promise<User> {
    const user = await this.usersRepository.findOne(query, options);
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
    await this.usersRepository.nativeDelete({ id });
    return id;
  }
}
