import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

export interface CrudServiceInterface<T, CDTO, UDTO> {
  find(id: string | number): T | Promise<T>;
  findAll(): T[] | Promise<T[]>;
  create(entity: T | CDTO): Promise<void> | Promise<T> | Promise<InsertResult>;
  update(
    id: string | number,
    entity: T | UDTO,
  ): Promise<void> | Promise<T> | Promise<UpdateResult>;
  deleteFromId(id: string | number): Promise<void> | Promise<DeleteResult>;
  delete(entity: T): Promise<void> | Promise<DeleteResult>;
}
