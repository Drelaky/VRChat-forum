import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumCategory } from './entities/forum-category.entity';
import { ForumCategoryController } from './forum-category.controller';
import { ForumCategoryService } from './forum-category.service';
import { ForumAltCategory } from '@app/forum-alt-category/entities/forum-alt-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ForumCategory, ForumAltCategory])],
  controllers: [ForumCategoryController],
  providers: [ForumCategoryService],
})
export class ForumCategoryModule {}
