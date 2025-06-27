import { PermissionEnum } from '../../mixins/PermissionCode';

export type User = {
  discordID: string;
  id: string;
  img: string;
  role: Role;
  theme: string;
  username: string;
};

type Role = {
  id: string;
  isMain: boolean;
  name: string;
  permissions: Permission[];
};

type Permission = {
  code: PermissionEnum;
  id: string;
};
