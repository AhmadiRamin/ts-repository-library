// import all interfaces
import { IWrite } from '../common/IWrite';
import { IRead } from '../common/IRead';
// that class only can be extended
export interface ISharePointBaseRepository<T> extends IWrite<T>, IRead<T> {

}