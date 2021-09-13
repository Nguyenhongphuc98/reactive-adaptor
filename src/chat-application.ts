import ChatController from "./controller/chat-controller";
import chatManager from "./manager/chat-manager";
import friendChatManager from "./manager/friend-chat-manager";
import groupChatManager from "./manager/group-chat-manager";


class ChatApplication {
    
    chatController: ChatController;

    constructor() {
        this.chatController = new ChatController();    
    }

    async startup() {
        this.registerListeners();
        await this.initServices();
        await this.initManager();

        this.load();
    }

    private registerListeners() {
        console.log("Event listeners...");
    }

    private initServices(): Promise<boolean> {
        console.log("Init service...");
        return Promise.resolve(true);
    }

    private initManager() {
        console.log("Init manager...");
        return friendChatManager.init()
        .then(v => {
            return groupChatManager.init();
        })
        .then(v => {
            return  chatManager.init();
        })
    }

    private load() {
        require("./index");
    }
}

const appInstance = new ChatApplication();
appInstance.startup();

export default appInstance;