import { Role } from '@app/roles/entities/role.entity';
import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  username: string;

  @Column()
  @IsString()
  discordID: string;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  img: string | null;

  @ManyToOne(() => Role, (role: Role) => role.users, {
    eager: true,
  })
  role?: Role;

  @Column({ nullable: true })
  theme?: string;
}
