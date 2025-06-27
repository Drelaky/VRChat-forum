import { IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ForumAltCategory } from '@app/forum-alt-category/entities/forum-alt-category.entity';

@Entity({ name: 'mainCategory' })
export class ForumCategory {
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

  @OneToMany(
    () => ForumAltCategory,
    (altcategory: ForumAltCategory) => altcategory.mainCategory,
    {
      eager: true,
      cascade: true,
    },
  )
  altCategory: ForumAltCategory[];
}
