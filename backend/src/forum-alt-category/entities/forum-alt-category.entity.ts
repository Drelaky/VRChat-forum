import { ForumCategory } from '@app/forum-category/entities/forum-category.entity';
import { IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'altCategory' })
export class ForumAltCategory {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  url: string;

  @Column()
  @IsString()
  description: string;

  @ManyToOne(() => ForumCategory, (role: ForumCategory) => role.altCategory, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  mainCategory?: ForumCategory;
}
