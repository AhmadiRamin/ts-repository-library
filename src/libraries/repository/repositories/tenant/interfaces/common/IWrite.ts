import { ITenantProperty } from "./ITenantProperty";

export interface IWrite {
    add(newProperty: ITenantProperty): Promise<void>;
    update(newProperty: ITenantProperty): Promise<void>;
    delete(key:string): Promise<void>;
}