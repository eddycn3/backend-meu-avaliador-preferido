export interface IModelCRUD<T> {
  create(entity: T): Promise<T>;
  getByID(id: number): Promise<T>;
  update?(entity: T): Promise<T>;
  delete?(id: number): Promise<T>;
}
