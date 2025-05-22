import { UUID } from 'crypto';

export class GetUserRoleQuery {
  constructor(public readonly userId: UUID) {}
}
