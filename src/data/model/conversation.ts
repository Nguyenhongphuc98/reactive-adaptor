export type ConvType = "normal" | "importance";

export class Conversation {

    convId: string;
    convName: string;
    creatorId: string;
    isGroup: boolean;
    isStranger: boolean;
    lastMessage: string;
    lastDname: string;
    lastMessageId: string;
    convType: ConvType;
    avatar: string;

    constructor(
        creator: string,
        name: string,
        isGroup: boolean,
        id: string,
        lastDname: string,
        lastMessage: string,
        avt: string) {

        this.convId = id;
        this.creatorId = creator;
        this.convName = name;
        this.isGroup = isGroup;
        this.isStranger = false;
        this.lastMessage = lastMessage;
        this.lastDname = lastDname;
        this.lastMessageId = "";
        this.avatar = avt;
        this.convType = Math.random() > 0.5 ? "normal" : "importance";
    }
}
