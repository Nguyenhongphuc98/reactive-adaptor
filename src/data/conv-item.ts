
export type ConvType = "normal" | "importance";
export class ConvItem {

    id: string;
    name: string;
    content: string;
    type: ConvType;
    inGroup: boolean;

    constructor(_name: string, _ingroup: boolean, _content: string) {
        this.id = new Date().getTime().toString();
        this.name = _name;
        this.content = _content;
        this.type = Math.random() > 0.5 ? "normal" : "importance";
        this.inGroup = _ingroup;
    }
}