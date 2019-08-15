
import { sp, SPRest, Web, StorageEntity } from "@pnp/sp";
import { ITenantBaseRepository } from "../interfaces/base/ITenantBaseRepository";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ExtensionContext } from '@microsoft/sp-extension-base';
import { ITenantProperty } from "../interfaces/common/ITenantProperty";
import { SPHttpClientResponse, SPHttpClient } from "@microsoft/sp-http";

export default class TenantBaseRepository implements ITenantBaseRepository{
    protected _sp: SPRest;
    protected _context: WebPartContext | ExtensionContext;
    private appCatalogUrl:string;
    // Constructor
    constructor(context: WebPartContext | ExtensionContext) {
        // Setuo Context to PnPjs
        sp.setup({
            spfxContext: context
        });
        this._sp = sp;
        this._context = context;
    }
    // Add tenant property
    public async add(property: ITenantProperty): Promise<void> {
        const appCatalogWeb: Web= await this.getAppCatalogWeb();
        return appCatalogWeb.setStorageEntity(property.key, property.Value, property.Description, property.Comment);
    }

    // Update tenant property
    public async update(newProperty: ITenantProperty) {
        return this.add(newProperty);
    }

    // Remove tenant property
    public async delete(key:string): Promise<void> {
        const appCatalogWeb: Web= await this.getAppCatalogWeb();
        return appCatalogWeb.removeStorageEntity(key);
    }

    // Get all properties
    public async getAll(): Promise<any> {
        try {
            const catalogUrl =await this.getAppCatalogUrl();
            const apiUrl = `${catalogUrl}/_api/web/AllProperties?$select=storageentitiesindex`;
            const data: SPHttpClientResponse = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
            if (data.ok) {
                const results = await data.json();
                if (results && results.storageentitiesindex) {
                    const properties: { [key: string]: ITenantProperty } = JSON.parse(results.storageentitiesindex);
                    return properties;
                }
            }
            return null;
        } catch (error) {
            return Promise.reject(error.message);
        }
    }

    // Get tenant property
    public async getOne(key:string): Promise<StorageEntity> {
        const appCatalogWeb: Web= await this.getAppCatalogWeb();
        return appCatalogWeb.getStorageEntity(key);
    }

    // Get App Catalog
    private async getAppCatalogUrl() {
        if(this.appCatalogUrl)
            return this.appCatalogUrl;
        try {
            const appCatalog: Web = await this._sp.getTenantAppCatalogWeb();
            const appCatalogWeb = await appCatalog.get();
            this.appCatalogUrl=appCatalogWeb.Url;
            return appCatalogWeb.Url;
        } catch (error) {
            console.dir(error);
            return Promise.reject(error.message);
        }
    }
    // Get App Catalog web
    private async getAppCatalogWeb():Promise<Web>{
        this.appCatalogUrl = await this.getAppCatalogUrl();
        return new Web(this.appCatalogUrl);
    }

}