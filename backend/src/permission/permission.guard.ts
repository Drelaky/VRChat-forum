import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PermissionEnum } from './permission.enum';
import { PERMISSIONS_KEY } from '@app/roles/role.decorator';
import { AuthService } from '@app/auth/auth.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['key'];
    const tokenType = request.headers['key2'];

    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionEnum[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) {
      return true;
    }
    const user = await this.authService.getUser(token, tokenType);

    console.log(user);

    let foundPermission: boolean = false;

    if (user?.role?.permissions) {
      for (let permission of user.role?.permissions) {
        if (
          requiredPermissions.find(
            (requiredPermission) => permission.code === requiredPermission,
          )
        )
          foundPermission = true;
      }
    }
    return foundPermission;
  }
}
