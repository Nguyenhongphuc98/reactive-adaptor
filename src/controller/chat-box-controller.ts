import friendChatManager from "../manager/friend-chat-manager";
import groupChatManager from "../manager/group-chat-manager";
import { getState } from "../reactive";


class ChatBoxController {

    convId: string;

    limitProcess: number;
    numberProcess: number;

    constructor(_convId: string) {
        this.convId = _convId;
        this.limitProcess = 1;
        this.numberProcess = 0;
    }

    updateConvContent(content: string) {
        if (content.length < 2) {
            console.log("Content must contain atleast 10 character!");
            return;
        }

        if (this.numberProcess >= this.limitProcess) {
            console.log("Exceed req at same time, try later!");
            return;
        }

        this.numberProcess++;
        setTimeout(() => {
            const manager = getState().ChatManager.items[this.convId].extraData.inGroup

                ? groupChatManager
                : friendChatManager;
            manager.updateConvContent(this.convId, content);
            this.numberProcess--;
        }, 10000);
    }

    updateConvtitle(title: string) {
        if (title.length < 5) {
            console.log("Title must contain atleast 5 character!");
            return;
        }

        if (this.numberProcess >= this.limitProcess) {
            console.log("Exceed req at same time, try later!");
            return;
        }

        this.numberProcess++;
        setTimeout(() => {
            const manager = getState().ChatManager.items[this.convId].extraData.inGroup
                ? groupChatManager
                : friendChatManager;

            manager.updateConvtitle(this.convId, title);
            this.numberProcess--;
        }, 10000);
    }
}


export default ChatBoxController;