
export class Group {

    creatorId: string;
    groupId: string;
    groupName: string;
    avatar: string;
   
    constructor(creator: string, avt: string, gid: string, name: string) {
        this.creatorId = creator;
        this.avatar = avt;
        this.groupId = gid;
        this.groupName = name;
    }
}
