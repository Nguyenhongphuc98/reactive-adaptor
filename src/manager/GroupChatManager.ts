import {IDataManager} from '../reactive';
import { StatePiece } from '../reactive/type';

class GroupChatManager implements IDataManager {

    name: string;
    key: string | string[];

    constructor() {
        this.name = "GroupChatManager";
        this.key = "convId";
    }
    
    getItem(meta: StatePiece, options: any) {
        throw new Error('Method not implemented.');
    }
    getList(meta: StatePiece, options: any): string[] {
        throw new Error('Method not implemented.');
    }
}