import { ConvItem } from '../data/conv-item';
import { IDataManager, signalAddItem, signalAddList, signalRenderItem, signalRenderList, StatePiece } from '../reactive';
import friendChatManager from './friend-chat-manager';
import groupChatManager from './group-chat-manager';

class ChatManager implements IDataManager {

    name: string;
    key: string | string[];

    normal: string[]
    importance: string[]
    didInit: boolean;

    currentConv?: string;

    constructor() {
        this.name = "ChatManager";
        this.key = "convId";
        this.normal = [];
        this.importance = [];
        this.didInit = false;
    }

    init(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.didInit)
                return resolve(false);

            const addItem = (conv: ConvItem) => {
                if (conv.type === "normal") {
                    this.normal.push(conv.id);
                } else {
                    this.importance.push(conv.id);
                }
            }

            friendChatManager.getFullList("all").forEach(addItem);
            groupChatManager.getFullList("all").forEach(addItem);

            signalAddList(this.name, "normal");
            signalAddList(this.name, "importance");

            this.currentConv = friendChatManager.getFullList("all")[0].id;
            signalAddItem(this.name, "currentConv")

            this.didInit = true;
            return resolve(true);
        })
    }

    getItem(meta: StatePiece, options: any) {
        if (!meta) return;
        if (meta.key === "currentConv")
            return this.currentConv;

        const _m = meta.extraData.inGroup ? groupChatManager : friendChatManager;
        return _m.getItem(meta, options);
    }

    getList(meta: StatePiece, options: any): string[] {
        if (!meta) return [];
        return meta.key === "normal" ? this.normal : this.importance;
    }

    markImportance(convId: string) {
        const index = this.normal.indexOf(convId);
        if (index > -1) {
            this.normal = this.normal.filter(v => v !== convId)
            // this.importance = this.importance.slice();
            this.importance.push(convId);
        }

        signalRenderList(this.name, 'normal');
        signalRenderList(this.name, 'importance');
    }

    markNormal(convId: string) {
        const index = this.importance.indexOf(convId);
        if (index > -1) {
            this.importance = this.importance.filter(v => v !== convId);
            // this.normal = this.normal.slice();
            this.normal.push(convId);
        }

        signalRenderList(this.name, 'importance');
        signalRenderList(this.name, 'normal');
    }

    removeItem(convId: string) {
        debugger;
        let index = this.importance.indexOf(convId);

        if (index > -1) {
            this.importance = this.importance.filter(v => v !== convId);
            signalRenderList(this.name, 'importance');
        } else {
            this.normal = this.normal.filter(v => v !== convId);
            signalRenderList(this.name, 'normal');
        }
    }

    changeConv(convId: string) {
        debugger;
        const old = this.currentConv || "";
        this.currentConv = convId;
        signalRenderItem(this.name, "currentConv");
        signalRenderItem(this.name, old);
        signalRenderItem(this.name, this.currentConv);
    }
}

export default new ChatManager();