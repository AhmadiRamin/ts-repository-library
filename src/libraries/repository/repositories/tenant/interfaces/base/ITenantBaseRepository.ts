// import all interfaces
import { IWrite } from '../common/IWrite';
import { IRead } from '../common/IRead';
// that class only can be extended
export interface ITenantBaseRepository extends IWrite, IRead {}