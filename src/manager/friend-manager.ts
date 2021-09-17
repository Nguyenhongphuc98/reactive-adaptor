
import LocalData from '../data/local';
import { Friend } from '../data/model/friend';
import {
    IDataManager,
    signalAddItem,
    signalAddList,
    signalRenderItem,
    StatePiece
} from '../reactive';

class FriendManager implements IDataManager {

    name: string;
    key: string | string[];

    friends: Friend[]
    didInit: boolean;

    constructor() {
        this.name = "FriendManager";
        this.key = "frId";
        this.friends = [];
        this.didInit = false;
    }

    init() {
        return this.didInit
            ? Promise.resolve(false)
            : LocalData.FetchFriendFromDB()
                .then(convs => {
                    for (let index = 0; index < convs.length; index++) {
                        const element = convs[index];
                        this.friends.push(element);
                        signalAddItem(this.name, element.frId);
                    }
                    signalAddList(this.name, "f-all");
                    this.didInit = true;
                    return Promise.resolve(true);
                })
    }

    getItem(meta: StatePiece, options: any) {
        return this.friends.find(item => item.frId === meta.key);
    }

    getList(meta: StatePiece, options: any): string[] {
        if (meta.key === "f-all")
            return this.friends.map(item => item.frId);
        return []
    }

    updateFriendName(frId: string, newName: string) {
        const item = this.friends.find(i => i.frId === frId);
        if (!item) return;
        item.dName = newName;
        signalRenderItem(this.name, item.frId);
    }

    getFullList(name: string): Friend[] {
        if (name === "all")
            return this.friends.slice();
        return [];
    }
}

export default new FriendManager();