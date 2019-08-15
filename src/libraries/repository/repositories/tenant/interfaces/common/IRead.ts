import { StorageEntity } from "@pnp/sp/src/types";

export interface IRead {
  getAll(): Promise<any>;
  getOne(key:string): Promise<StorageEntity>;
}