import { ConvItem } from '../data/conv-item';
import { LocalData } from '../data/local';
import { IDataManager, signalAddItem, signalAddList, signalRenderItem, StatePiece } from '../reactive';

class FriendChatManager implements IDataManager {

    name: string;
    key: string | string[];

    convItems: ConvItem[]
    didInit: boolean;

    constructor() {
        this.name = "FriendChatManager";
        this.key = "convId";
        this.convItems = [];
        this.didInit = false;
    }

    init() {
        return this.didInit
            ? Promise.resolve(false)
            : LocalData.FetchFromDB(false)
                .then(convs => {
                    for (let index = 0; index < convs.length; index++) {
                        const element = convs[index];
                        this.convItems.push(element);
                        signalAddItem(this.name, element.id, {inGroup: false});
                    }
                    signalAddList(this.name, "all");
                    this.didInit = true;
                    return Promise.resolve(true);
                })
    }

    getItem(meta: StatePiece, options: any) {
        return this.convItems.find(item => item.id === meta.key);
    }

    getList(meta: StatePiece, options: any): string[] {
        if (meta.key === "all")
            return this.convItems.map(item => item.id);
        return []
    }

    updateConvContent(convId: string, content: string) {
        const item = this.convItems.find(i => i.id === convId);
        if (!item) return;
        item.content = content;
        signalRenderItem(this.name, item.id);
    }

    updateConvtitle(convId: string, title: string) {
        const item = this.convItems.find(i => i.id === convId);
        if (!item) return;
        item.name = title;
        signalRenderItem(this.name, item.id);
    }

    getFullList(name: string): ConvItem[] {
        if (name === "all") 
            return this.convItems.slice();
        return [];
    }
}

export default new FriendChatManager();