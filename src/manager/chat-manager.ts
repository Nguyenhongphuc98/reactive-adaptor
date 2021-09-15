
import { Message } from '../data/model/message';

import friendManager from './friend-manager';
import groupManager from './group-manager';
import LocalData from '../data/local';

import {
    IDataManager,
    signalAddItem,
    signalAddList,
    signalRenderItem,
    signalRenderList,
    signalUpdateItem,
    StatePiece
} from '../reactive';
import { Conversation } from '../data/model/conversation';
import local from '../data/local';


class ChatManager implements IDataManager {

    name: string;
    key: string | string[];

    normal: Conversation[]
    importance: Conversation[]
    didInit: boolean;

    messages: Map<string, Message[]> // convId - mess list
    currentConv?: string;

    constructor() {
        this.name = "ChatManager";
        this.key = "convId";
        this.normal = [];
        this.importance = [];
        this.didInit = false;
        this.messages = new Map();
    }

    init(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.didInit)
                return resolve(false);

            LocalData.FetchConvFromDB()
                .then(convs => {
                    convs.forEach(conv => {
                        if (conv.convType === "normal") {
                            this.normal.push(conv);
                            signalAddItem(this.name, conv.convId, { list: "normal" });
                        } else {
                            this.importance.push(conv);
                            signalAddItem(this.name, conv.convId, { list: "importance" });
                        }
                    })

                    signalAddList(this.name, "normal");
                    signalAddList(this.name, "importance");

                    this.currentConv = this.normal[0].convId;
                    signalAddItem(this.name, "currentConv");

                    this.didInit = true;
                    return resolve(true);
                })
        })
    }

    getItem(meta: StatePiece, options: any) {
        if (!meta) return;

        const _key = meta.key;
        if (_key === "currentConv")
            return this.currentConv;

        meta.extraData = meta.extraData || {};

        switch (meta.extraData.list) {
            case "normal":
                return this.normal.find(conv => conv.convId === _key);

            case "importance":
                return this.importance.find(conv => conv.convId === _key);

            default:
                return this.messages.get(meta.extraData.list)?.find(m => m.mId === _key);
        }
    }

    getList(meta: StatePiece, options: any): string[] {
        if (!meta) return [];

        switch (meta.key) {
            case "normal":
                return this.normal.map(e => e.convId);

            case "importance":
                return this.importance.map(e => e.convId);

            default:
                return this.messages.get(meta.key)?.map(e => e.mId) || [];
        }
    }

    updateConvName(convId: string, newName: string) {
        let conv = this.normal.find(e => e.convId === convId) || this.importance.find(e => e.convId === convId);
        if (conv) {
            conv.convName = newName;
            signalRenderItem(this.name, convId);
        }

        if (this.isGroup(convId)) {
            groupManager.updateGroupName(convId, newName);
        } else {
            friendManager.updateFriendName(convId, newName);
        }
    }

    markImportance(convId: string) {
        let item = this.normal.find(e => e.convId === convId);
        debugger;
        if (item) {
            this.normal = this.normal.filter(v => v.convId !== convId);
            this.importance.push(item);
        }

        signalUpdateItem(this.name, convId, { list: "importance" });
        signalRenderList(this.name, 'normal');
        signalRenderList(this.name, 'importance');
    }

    markNormal(convId: string) {
        const item = this.importance.find(e => e.convId === convId);

        if (item) {
            this.importance = this.importance.filter(v => v.convId !== convId);
            this.normal.push(item);
        }

        signalUpdateItem(this.name, convId, { list: "normal" });
        signalRenderList(this.name, 'normal');
        signalRenderList(this.name, 'importance');
    }

    removeItem(convId: string) {
        const item = this.importance.find(e => e.convId === convId);

        if (item) {
            this.importance = this.importance.filter(v => v.convId !== convId);
            signalRenderList(this.name, 'importance');
        } else {
            this.normal = this.normal.filter(v => v.convId !== convId);
            signalRenderList(this.name, 'normal');
        }
    }

    changeConv(convId: string) {
        this.currentConv = convId;
        signalRenderItem(this.name, "currentConv");
    }

    sendMessage(message: Message) {

        // make sure this send to valid conversation
        const convId = message.convId;
        const conv = this.importance.find(e => e.convId === convId) || this.normal.find(e => e.convId === convId);

        if (!conv) {
            console.log('Send to unknow conversation');
            return;
        }

        conv.lastDname = local.me?.dName || "";
        conv.lastMessage = message.content;
        conv.lastMessageId = message.mId;

        signalRenderItem(this.name, convId);
        signalAddItem(this.name, message.mId, { list: convId });


        if (this.messages.has(convId)) {
            this.messages.get(convId)!.push(message);
            signalRenderList(this.name, convId);
        } else {
            this.messages.set(convId, [message]);
            signalAddList(this.name, convId);
        }
    }

    isImportance(convId: string): boolean {
        return this.importance.find(e => e.convId === convId) !== undefined;
    }

    private isGroup(convId: string): boolean {
        return convId[0] === "g";
    }
}

export default new ChatManager();