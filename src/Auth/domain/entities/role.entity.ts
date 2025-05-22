import { Entity } from 'libs/shared-kernel/src';

export class Role extends Entity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly permissions: string[],
    public readonly description?: string,
  ) {
    super(id);
  }
}
