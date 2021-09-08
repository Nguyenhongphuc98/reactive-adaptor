import ChatBoxController from "./chat-box-controller";


class ChatBoxControllerManager {

    controllers: ChatBoxController[];

    constructor() {
        this.controllers = []
    }

    getControllerById(cid: string): ChatBoxController {
        let controller = this.controllers.find(c => c.convId === cid);
        if (!controller) {
            controller = new ChatBoxController(cid);
            this.controllers.push(controller);
        }

        return controller;
    }
}

export default new ChatBoxControllerManager();