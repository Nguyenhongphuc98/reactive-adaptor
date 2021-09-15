
export class Message {

    mId: string;
    fromUid: string;
    convId: string;
    createTime: number;
    content: string;

    constructor(from: string, convId: string, createTime: number, content: string) {
        this.mId = new Date().getTime().toString();
        this.fromUid = from;
        this.convId =convId;
        this.createTime = createTime;
        this.content = content;
    }
}
