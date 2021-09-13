
import chatManager from "../manager/chat-manager";

class ChatController {

    limitProcess: number;
    numberProcess: number;

    didInit: boolean;

    constructor() {
        this.limitProcess = 1;
        this.numberProcess = 0;
        this.didInit = false;
    }

    init(): Promise<boolean> {
        if (this.didInit) return Promise.resolve(true);
        console.log('Init Chatcontroller');

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 3000);
        });
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
        if (!convId || convId.length < 5) {
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