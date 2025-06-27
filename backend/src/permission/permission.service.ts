import { AlreadyExistsException } from '@app/exceptions/already-exists.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';
import { PermissionEnum } from './permission.enum';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async seed() {
    const permissionEnums: PermissionEnum[] = [
      PermissionEnum.EDIT_USERS,
      PermissionEnum.EDIT_ROLES,
      PermissionEnum.CLOSE_POSTS,
      PermissionEnum.CREATE_ALTCATEGORY,
      PermissionEnum.CREATE_MAINCATEGORY,
      PermissionEnum.EDIT_POSTS,
      PermissionEnum.CREATE_POST,
      PermissionEnum.CREATE_ROLE,
    ];

    for (const permissionEnum of permissionEnums) {
      const permission = await this.findOneByCode(permissionEnum);
      if (!permission) {
        try {
          await this.create({
            code: permissionEnum,
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  findOneByCode(code: PermissionEnum): Promise<Permission | null> {
    return this.permissionRepo.findOne({
      where: { code },
    });
  }

  create(createPermissionDto: CreatePermissionDto): Promise<void | Permission> {
    let permission: Permission = new Permission();
    permission.code = createPermissionDto.code;

    return this.permissionRepo.save(permission).catch((error: any) => {
      switch (error.errno) {
        case 1062:
          throw new AlreadyExistsException();
      }
    });
  }

  async getAllPermissions() {
    return this.permissionRepo.find();
  }
}
