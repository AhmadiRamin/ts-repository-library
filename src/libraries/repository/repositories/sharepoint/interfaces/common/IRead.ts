export interface IRead<T> {
  getAll(): Promise<T[]>;
  getOne(id: number): Promise<T>;
  query(filter:string,expand:string,orderBy:string,top:number): Promise<T[]>;
}