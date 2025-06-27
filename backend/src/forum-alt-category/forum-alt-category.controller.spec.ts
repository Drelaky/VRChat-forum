import { Test, TestingModule } from '@nestjs/testing';
import { ForumAltCategoryController } from './forum-alt-category.controller';
import { ForumAltCategoryService } from './forum-alt-category.service';

describe('ForumAltCategoryController', () => {
  let controller: ForumAltCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForumAltCategoryController],
      providers: [ForumAltCategoryService],
    }).compile();

    controller = module.get<ForumAltCategoryController>(ForumAltCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
