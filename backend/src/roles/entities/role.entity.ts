import { Auth } from '@app/auth/entities/auth.entity';
import { Permission } from '@app/permission/entities/permission.entity';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @IsNotEmpty()
  name?: string;

  @OneToMany(() => Auth, (user: Auth) => user.role)
  users?: Auth[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    eager: true,
  })
  permissions?: Permission[];

  @Column({ default: false })
  isMain: boolean;
}
