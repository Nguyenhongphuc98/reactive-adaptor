
import LocalData from '../data/local';
import { Group } from '../data/model/group';
import {
    IDataManager,
    signalAddItem,
    signalAddList,
    signalRenderItem,
    StatePiece
} from '../reactive';

class GroupManager implements IDataManager {

    name: string;
    key: string | string[];

    groups: Group[]
    didInit: boolean;

    constructor() {
        this.name = "GroupManager";
        this.key = "groupId";
        this.groups = [];
        this.didInit = false;
    }

    init() {
        return this.didInit
            ? Promise.resolve(false)
            : LocalData.FetchGroupFromDB()
                .then(convs => {
                    for (let index = 0; index < convs.length; index++) {
                        const element = convs[index];
                        this.groups.push(element);
                        signalAddItem(this.name, element.groupId);
                    }
                    signalAddList(this.name, "g-all");
                    this.didInit = true;
                    return Promise.resolve(true);
                })
    }

    getItem(meta: StatePiece, options: any) {
        return this.groups.find(item => item.groupId === meta.key);
    }

    getList(meta: StatePiece, options: any): string[] {
        if (meta.key === "g-all")
            return this.groups.map(item => item.groupId);
        return []
    }

    updateGroupName(gId: string, newName: string) {
        const item = this.groups.find(i => i.groupId === gId);
        if (!item) return;
        item.groupName = newName;
        signalRenderItem(this.name, item.groupId);
    }

    getFullList(name: string): Group[] {
        if (name === "g-all")
            return this.groups.slice();
        return [];
    }
}

export default new GroupManager();