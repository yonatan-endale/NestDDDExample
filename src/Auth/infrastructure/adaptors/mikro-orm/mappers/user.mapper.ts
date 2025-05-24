import { User } from '../persistence/user.persistence.entity';
//import { Role as RoleEntity } from '../persistence/roles.persistence.entity';
import {
  User as DomainUser,
  Role as DomainRole,
} from '../../../../domain/entities/index';

export class AspNetUserMapper {
  static toDomain(entity: User): DomainUser {
    const roles = entity.roles
      .getItems()
      .map(
        (role) =>
          new DomainRole(
            role.id,
            role.name,
            role.permissions,
            role.updatedAt,
            role.createdAt,
            role.createdBy,
            role.updatedBy,
            role.description,
          ),
      );

    return new DomainUser(
      entity.id,
      entity.firstName,
      entity.lastName,
      entity.email,
      roles,
    );
  }
  // static toEntity(domain: DomainUser): User {
  //   const entity = new User();
  //   entity.id = domain.id;
  //   entity.firstName = domain.firstName;
  //   entity.lastName = domain.lastName;
  //   entity.email = domain.email;
  // }
}
