import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEnum } from '../permission.enum';
import { Role } from '@app/roles/entities/role.entity';

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  @IsNotEmpty()
  code: PermissionEnum;

  @ManyToMany((type) => Role, (role) => role.permissions, { eager: false })
  @JoinTable()
  roles: Role[];
}
