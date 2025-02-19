import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { IUser } from '@portfolio/common-models';

@Entity()
export class User implements IUser {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @Property({ unique: true })
  username!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ default: false })
  isActive!: boolean;

  @Property({ nullable: true })
  password?: string;

  @Property({ nullable: true })
  accessToken?: string;

  @Property({ nullable: true })
  refreshToken?: string;

  //@ManyToMany(() => Role, role => role.users, { nullable: true })
  //roles?: Collection<IRole>;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(data: Partial<User> = {}) {
    Object.assign(this, data);
  }
}
