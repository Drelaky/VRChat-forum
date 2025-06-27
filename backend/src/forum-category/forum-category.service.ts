import { AlreadyExistsException } from '@app/exceptions/already-exists.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateForumCategoryDto } from './dto/create-forum-category.dto';
import { ForumCategory } from './entities/forum-category.entity';

@Injectable()
export class ForumCategoryService {
  constructor(
    @InjectRepository(ForumCategory)
    private readonly forumCategoryRepo: Repository<ForumCategory>,
  ) {}

  async create(createForumCategoryDto: CreateForumCategoryDto) {
    const foundCategory = await this.forumCategoryRepo.find({
      where: {
        title: createForumCategoryDto.title,
      },
    });

    if (foundCategory.length > 0) {
      return new AlreadyExistsException();
    }

    this.forumCategoryRepo.save({
      title: createForumCategoryDto.title,
      url: createForumCategoryDto.title.toLocaleLowerCase(),
      description: createForumCategoryDto.description,
    });

    return 'successful';
  }

  async getAll() {
    return await this.forumCategoryRepo.find({
      relations: ['altCategory'],
    });
  }

  async getOneById(id: string) {
    return await this.forumCategoryRepo.find({
      where: {
        id: id,
      },
    });
  }
}
