
import chatManager from "../manager/chat-manager";
import friendChatManager from "../manager/friend-chat-manager";
import groupChatManager from "../manager/group-chat-manager";


class ChatController {

    limitProcess: number;
    numberProcess: number;

    constructor() {
        this.limitProcess = 1;
        this.numberProcess = 0;
    }

    init(): Promise<boolean> {
        return friendChatManager.init()
            .then(v => {
                return groupChatManager.init()
            })
            .then(v => {
                return chatManager.init();
            })
    }

    changeList(convId: string) {
        if (chatManager.importance.includes(convId)) {
            this.markNormal(convId);
        } else {
            this.markImportance(convId);
        }
    }

    markImportance(convId: string) {
        chatManager.markImportance(convId);
    }

    markNormal(convId: string) {
        chatManager.markNormal(convId);
    }

    removeItem(convId: string) {
        chatManager.removeItem(convId);
    }

    changeConv(convId: string) {
        if (!convId || convId.length <5) {
            console.log("Invalid convId, please try other!");
            return;
        }
       chatManager.changeConv(convId);
    }

    getCurrentConv() {
        return chatManager.currentConv;
    }
}

export default ChatController;