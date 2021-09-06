export interface CrudServiceInterface<T, CDTO, UDTO> {
  find(id: string | number): Promise<T>;
  findAll(): Promise<T[]>;
  create(entity: T | CDTO): Promise<void>;
  update(id: string | number, entity: T | UDTO): Promise<void>;
  deleteFromId(id: string | number): Promise<void>;
  delete(entity: T): Promise<void>;
}
