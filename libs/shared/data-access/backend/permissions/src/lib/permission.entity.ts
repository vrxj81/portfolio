import { Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { IPermission, IRole } from '@portfolio/common-models';

@Entity({ tableName: 'permissions' })
export class Permission implements IPermission {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @Property({ unique: true })
  name!: string;

  @Property()
  action!: string;

  @Property()
  subject!: string;

  @Property({ nullable: true, type: 'jsonb' })
  conditions?: string;

  @ManyToMany('Role', 'permissions')
  roles?: IRole[] | undefined;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  constructor(data: Partial<Permission> = {}) {
    Object.assign(this, data);
  }
}
