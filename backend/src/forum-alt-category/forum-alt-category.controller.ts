import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateForumAltCategoryDto } from './dto/create-forum-alt-category.dto';
import { ForumAltCategoryService } from './forum-alt-category.service';

@Controller()
export class ForumAltCategoryController {
  constructor(
    private readonly forumAltCategoryService: ForumAltCategoryService,
  ) {}

  @Post('create')
  create(@Body() createForumCategoryDto: CreateForumAltCategoryDto) {
    return this.forumAltCategoryService.create(createForumCategoryDto);
  }

  @Get('getAllMainCategory')
  getAll() {
    return this.forumAltCategoryService.getAll();
  }

  @Post('getForumAltOneById')
  getOneById(@Body() data: { id: string }) {
    return this.forumAltCategoryService.getOneById(data.id);
  }
}
