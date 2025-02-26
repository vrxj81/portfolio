import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IPermission, IRole } from '@portfolio/common-models';

@Entity({ name: 'permissions' })
export class Permission implements IPermission {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column()
  action!: string;

  @Column()
  subject!: string;

  @Column({ nullable: true, type: 'jsonb' })
  conditions?: string;

  @ManyToMany('Role', 'permissions')
  roles?: IRole[];

  @CreateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

  constructor(data: Partial<Permission> = {}) {
    Object.assign(this, data);
  }
}
