import { Module } from '@nestjs/common';
import { ForumAltCategoryService } from './forum-alt-category.service';
import { ForumAltCategoryController } from './forum-alt-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumAltCategory } from './entities/forum-alt-category.entity';
import { ForumCategory } from '@app/forum-category/entities/forum-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ForumAltCategory, ForumCategory])],
  controllers: [ForumAltCategoryController],
  providers: [ForumAltCategoryService],
})
export class ForumAltCategoryModule {}
