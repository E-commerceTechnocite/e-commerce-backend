import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

export interface CrudServiceInterface<T> {
  find(id: string | number): T | Promise<T>;
  findAll(): T[] | Promise<T[]>;
  create(entity: T): Promise<void> | Promise<T> | Promise<InsertResult>;
  update(
    id: string | number,
    entity: T,
  ): Promise<void> | Promise<T> | Promise<UpdateResult>;
  deleteFromId(id: string | number): Promise<void> | Promise<DeleteResult>;
  delete(entity: T): Promise<void> | Promise<DeleteResult>;
}
