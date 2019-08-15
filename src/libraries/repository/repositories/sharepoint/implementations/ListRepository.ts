
import {sp, ItemAddResult, ItemUpdateResult, List, SPRest, Web} from "@pnp/sp";
import { ISharePointBaseRepository } from "../interfaces/base/ISharePointBaseRepository";

export default class ListRepository<T> implements ISharePointBaseRepository<T>{
    
    protected _list: List;
    protected _web: Web;
    protected _sp:SPRest;

    constructor(listId:string,webUrl?:string){
        this._web = webUrl ? new Web(webUrl) : this._web = sp.web;
        this._list = this._web.lists.getById(listId);
        this._sp = sp;
    }
    public async add(item: T): Promise<ItemAddResult> {
        return this._list.items.add(item);
    }
    public async update(id: number, item: T): Promise<ItemUpdateResult> {
        return this._list.items.getById(id).update(item);
    }
    public async delete(id: number): Promise<void> {
        return this._list.items.getById(id).delete();
    }
    public async getAll(): Promise<any[]> {
        return this._list.items.getAll();
    }
    public async getOne(id: number): Promise<any> {
        return this._list.items.getById(id).get();
    }
    public async query(filter: string, expand: string,orderBy:string,top:number): Promise<any[]> {
        return this._list.items.select(filter).expand(expand).orderBy(orderBy).top(top).get();
    }
}