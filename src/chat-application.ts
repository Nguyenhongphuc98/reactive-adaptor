import ChatController from "./controller/chat-controller";
import chatManager from "./manager/chat-manager";
import friendManager from "./manager/friend-manager";
import groupManager from "./manager/group-manager";


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
        return friendManager.init()
        .then(v => {
            return groupManager.init();
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