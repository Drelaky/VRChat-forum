import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionsGuard } from './permission.guard';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), AuthModule],
  controllers: [PermissionController],
  exports: [PermissionService, PermissionsGuard],
  providers: [PermissionService, PermissionsGuard],
})
export class PermissionModule {
  constructor(private readonly permissionService: PermissionService) {}

  async onModuleInit() {
    await this.permissionService.seed();
  }
}
