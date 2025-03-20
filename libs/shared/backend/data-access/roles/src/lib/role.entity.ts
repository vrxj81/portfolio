import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IPermission, IRole, IUser } from '@portfolio/common-models';

@Entity({ name: 'roles' })
export class Role implements IRole {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany('User', 'roles')
  users?: IUser[];

  @ManyToMany('Permission', 'roles')
  @JoinTable()
  permissions?: IPermission[];

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

  constructor(data: Partial<Role> = {}) {
    Object.assign(this, data);
  }
}
