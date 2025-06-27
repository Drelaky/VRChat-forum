import { AlreadyExistsException } from '@app/exceptions/already-exists.exception';
import { Permission } from '@app/permission/entities/permission.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Auth } from '@app/auth/entities/auth.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,

    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,

    @InjectRepository(Auth)
    private readonly authRepo: Repository<Auth>,
  ) {}

  async seed() {
    const foundSystemRole: Role[] = await this.roleRepo.find({
      where: {
        name: 'System',
      },
    });

    if (foundSystemRole && foundSystemRole.length) {
      return;
    }

    const foundDrelakyUser: Auth[] = await this.authRepo.find({
      where: {
        discordID: '374615928760958979',
        username: 'drelaky',
      },
    });

    const getAllPermission: Permission[] = await this.permissionRepo.find();

    this.roleRepo
      .save({
        isMain: true,
        name: 'System',
        permissions: getAllPermission,
        users: foundDrelakyUser,
      })
      .catch((error: any) => {
        console.log(error);

        switch (error.errno) {
          case 1062:
            throw new AlreadyExistsException();
        }
      });
  }

  async create(data: CreateRoleDto) {
    this.roleRepo.save(data);

    return 'successfull';
  }
}
