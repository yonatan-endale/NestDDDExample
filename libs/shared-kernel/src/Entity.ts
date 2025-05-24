export abstract class Entity {
  public readonly id!: string;
  public readonly updatedAt: Date;
  public readonly createdAt: Date;
  public readonly createdBy: string;
  public readonly updatedBy: string;
  constructor(
    id?: string,
    updateAt?: Date,
    createdAt?: Date,
    createdBy?: string,
    updatedBy?: string,
  ) {
    this.id = id ?? crypto.randomUUID();
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updateAt ?? new Date();
    this.createdBy = createdBy ?? '';
    this.updatedBy = updatedBy ?? '';
  }

  public equals(other?: Entity): boolean {
    if (!other) return false;
    return other.id === other.id;
  }
}
