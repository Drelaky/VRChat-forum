import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionsGuard } from './permission.guard';
import { PermissionService } from './permission.service';

@Controller()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @UseGuards(PermissionsGuard)
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get('getPermissions')
  async getPermissions() {
    return this.permissionService.getAllPermissions();
  }
}
