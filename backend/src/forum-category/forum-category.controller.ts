import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateForumCategoryDto } from './dto/create-forum-category.dto';
import { ForumCategoryService } from './forum-category.service';

@Controller()
export class ForumCategoryController {
  constructor(private readonly forumCategoryService: ForumCategoryService) {}

  @Post('create')
  create(@Body() createForumCategoryDto: CreateForumCategoryDto) {
    return this.forumCategoryService.create(createForumCategoryDto);
  }

  @Get('getAllMainCategory')
  getAll() {
    return this.forumCategoryService.getAll();
  }

  @Post('getFourmMainCategoryOneById')
  getOneById(@Body() data: { id: string }) {
    return this.forumCategoryService.getOneById(data.id);
  }
}
