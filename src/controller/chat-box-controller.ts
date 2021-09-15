import chatManager from "../manager/chat-manager";
import { Message } from "../data/model/message";
import local from "../data/local";


class ChatBoxController {

    convId: string;

    limitProcess: number;
    numberProcess: number;

    constructor(_convId: string) {
        this.convId = _convId;
        this.limitProcess = 1;
        this.numberProcess = 0;
    }

    updateConvName(name: string) {
        if (name.length < 5) {
            console.log("Title must contain atleast 5 character!");
            return;
        }

        if (this.numberProcess >= this.limitProcess) {
            console.log("Exceed req at same time, try later!");
            return;
        }

        this.numberProcess++;
        setTimeout(() => {
            chatManager.updateConvName(this.convId, name);
            this.numberProcess--;
        }, 0);
    }

    sendMessage(message: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const mess = new Message(
                local.me!.frId,
                this.convId,
                new Date().getTime(),
                message
            )
    
            // maybe call to some services ...
    
            setTimeout(() => {
                chatManager.sendMessage(mess);
                resolve(true);
            }, 1000);
        })
    }
}


export default ChatBoxController;