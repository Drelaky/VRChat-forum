import { PartialType } from '@nestjs/mapped-types';
import { CreateForumAltCategoryDto } from './create-forum-alt-category.dto';

export class UpdateForumAltCategoryDto extends PartialType(CreateForumAltCategoryDto) {}
