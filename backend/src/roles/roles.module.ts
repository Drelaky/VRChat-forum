import { AuthModule } from '@app/auth/auth.module';
import { Auth } from '@app/auth/entities/auth.entity';
import { Permission } from '@app/permission/entities/permission.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { PermissionModule } from '@app/permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission, Auth]),
    AuthModule,
    PermissionModule,
  ],
  controllers: [RolesController],
  exports: [RolesService],
  providers: [RolesService],
})
export class RolesModule {
  constructor(private readonly rolesService: RolesService) {}

  async onModuleInit() {
    await this.rolesService.seed();
  }
}
