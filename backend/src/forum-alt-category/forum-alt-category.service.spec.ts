import { Test, TestingModule } from '@nestjs/testing';
import { ForumAltCategoryService } from './forum-alt-category.service';

describe('ForumAltCategoryService', () => {
  let service: ForumAltCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForumAltCategoryService],
    }).compile();

    service = module.get<ForumAltCategoryService>(ForumAltCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
