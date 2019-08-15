
import {sp, ItemAddResult, ItemUpdateResult, List, SPRest, Web} from "@pnp/sp";
import { ISharePointBaseRepository } from "./ISharePointBaseRepository";
import IListItem from "../core/IListItem";
import IQueryOption from "../core/IQueryOption";

export default class SharePointRepository<T extends IListItem> implements ISharePointBaseRepository<T>{
    protected _list: List;
    protected _web: Web;
    protected _sp:SPRest;

    constructor(listId:string,webUrl?:string){
        this._web = webUrl ? new Web(webUrl) : this._web = sp.web;
        this._list = this._web.lists.getById(listId);
        this._sp = sp;
    }
    public async add(item: Omit<T,"Id">): Promise<ItemAddResult> {
        return this._list.items.add(item);
    }
    public async update(item: T): Promise<ItemUpdateResult> {
        const updatingItem: Omit<T,"Id"> = item;
        return this._list.items.getById(item.Id).update(updatingItem);
    }
    public async delete(id: number): Promise<void> {
        return this._list.items.getById(id).delete();
    }
    public async getAll(): Promise<T[]> {
        return this._list.items.getAll();
    }
    public async getOne(id: number,queryOptions:Omit<IQueryOption,"top" | "filter">): Promise<T> {
        let result = this._list.items.getById(id);
        if(queryOptions.expand)
            result=result.expand(...queryOptions.expand);
        if(queryOptions.select)
            result = result.select(...queryOptions.select);
        return result.get();
    }
    public getItemsByCAMLQuery: (query: import("@pnp/sp").CamlQuery, ...expands: string[]) => Promise<T[]>;
    public getItemsByQuery: (queryOptions: IQueryOption) => Promise<T[]>;
}