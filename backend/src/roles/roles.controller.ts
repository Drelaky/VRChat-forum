import { PermissionEnum } from '@app/permission/permission.enum';
import { PermissionsGuard } from '@app/permission/permission.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Permissions } from './role.decorator';
import { RolesService } from './roles.service';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('createRole')
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionEnum.CREATE_ROLE)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }
}
