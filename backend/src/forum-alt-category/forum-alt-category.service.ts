import { Injectable } from '@nestjs/common';
import { CreateForumAltCategoryDto } from './dto/create-forum-alt-category.dto';
import { UpdateForumAltCategoryDto } from './dto/update-forum-alt-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ForumAltCategory } from './entities/forum-alt-category.entity';
import { Repository } from 'typeorm';
import { AlreadyExistsException } from '@app/exceptions/already-exists.exception';
import { ForumCategory } from '@app/forum-category/entities/forum-category.entity';
import { CustomException } from '@app/exceptions/custom.exception';

@Injectable()
export class ForumAltCategoryService {
  constructor(
    @InjectRepository(ForumAltCategory)
    private readonly forumAltCategoryRepo: Repository<ForumAltCategory>,

    @InjectRepository(ForumCategory)
    private readonly forumCategoryRepo: Repository<ForumCategory>,
  ) {}

  async create(createForumAltCategoryDto: CreateForumAltCategoryDto) {
    const foundCategory = await this.forumCategoryRepo.findOne({
      where: {
        id: createForumAltCategoryDto.mainCategory,
      },
    });

    const foundAltCategory = await this.forumAltCategoryRepo.find({
      where: {
        title: createForumAltCategoryDto.categoryData.title,
      },
    });

    if (!foundCategory) {
      return new CustomException('MainCategory not found', 404);
    }

    if (foundAltCategory.length > 0) {
      return new AlreadyExistsException();
    }

    await this.forumAltCategoryRepo.save({
      title: createForumAltCategoryDto.categoryData.title,
      url: createForumAltCategoryDto.categoryData.title.toLocaleLowerCase(),
      description: createForumAltCategoryDto.categoryData.description,
      mainCategory: foundCategory,
    });
    return 'successfull';
  }

  async getAll() {
    return await this.forumAltCategoryRepo.find();
  }

  async getOneById(id: string) {
    return await this.forumAltCategoryRepo.find({
      where: {
        id: id,
      },
    });
  }
}
