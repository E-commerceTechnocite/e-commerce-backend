export interface CrudServiceInterface<T> {
  find(id: string | number): T;
  findAll(): T[];
  create(entity: T): void | T | Promise<void> | Promise<T>;
  update(id: string | number, entity: T): void | T | Promise<void> | Promise<T>;
  deleteFromId(id: string | number): void | Promise<void>;
  delete(entity: T): void | Promise<void>;
}
