import { SetMetadata } from '@nestjs/common';
import { Role } from '../../models/users/entities/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
