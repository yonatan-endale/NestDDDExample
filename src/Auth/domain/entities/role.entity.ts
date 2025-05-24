import { Entity } from 'libs/shared-kernel/src';

export class Role extends Entity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly permissions: string[],
    public readonly updatedAt: Date,
    public readonly createdAt: Date,
    public readonly createdBy: string,
    public readonly updatedBy: string,
    public readonly description?: string,
  ) {
    super(id, updatedAt, createdAt, createdBy, updatedBy);
  }
}
