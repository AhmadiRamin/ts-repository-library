import { ItemAddResult, ItemUpdateResult } from "@pnp/sp";
export interface IWrite<T> {
    add(item: T): Promise<ItemAddResult>;
    update(id: number, item: T): Promise<ItemUpdateResult>;
    delete(id: number): Promise<void>;
}