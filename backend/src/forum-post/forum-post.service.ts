import { Injectable } from '@nestjs/common';
import { CreateForumPostDto } from './dto/create-forum-post.dto';
import { UpdateForumPostDto } from './dto/update-forum-post.dto';

@Injectable()
export class ForumPostService {
  create(createForumPostDto: CreateForumPostDto) {
    return 'This action adds a new forumPost';
  }

  findAll() {
    return `This action returns all forumPost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forumPost`;
  }

  update(id: number, updateForumPostDto: UpdateForumPostDto) {
    return `This action updates a #${id} forumPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} forumPost`;
  }
}
