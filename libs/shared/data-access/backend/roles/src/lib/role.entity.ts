import { Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { IPermission, IRole, IUser } from '@portfolio/common-models';

@Entity({ tableName: 'roles' })
export class Role implements IRole {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @Property({ unique: true })
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @ManyToMany('User', 'roles')
  users?: IUser[];

  @ManyToMany('Permission', 'roles')
  permissions?: IPermission[];

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(data: Partial<Role> = {}) {
    Object.assign(this, data);
  }
}
