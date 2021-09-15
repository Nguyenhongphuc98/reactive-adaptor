
import { Conversation } from "./model/conversation";
import { Friend } from "./model/friend";
import { Group } from "./model/group";

const dummyName = ["Hoàng", "Ngân", "Phương", "Mai", "quỳnh", "Thảo", "Thủy"];
const dummyName2 = ["Luyện", "ôn", "việc", "gia đình", "nhóm 1", "Tài liệu", "Bạn thân"];

class LocalData {

    friends: Friend[] = [];
    groups: Group[] = [];
    convs: Conversation[] = [];
    me?: Friend = undefined;


    public FetchFriendFromDB(): Promise<Friend[]> {
        return new Promise((resolve, reject) => {

            if (this.friends.length !== 0)
                resolve(this.friends);

            const total = 10;
            let step = 0;

            const genData = () => {
                step++;

                const n1 = dummyName[Math.floor(Math.random() * (dummyName.length - 1))];
                const n2 = dummyName[Math.floor(Math.random() * (dummyName.length - 1))];

                const fr = new Friend(
                    new Date().getTime().toString(),
                    `${n1} ${n2}`,
                    "https://s120-ava-talk.zadn.vn/b/6/9/6/4/120/058c026308be3df25036d458842f6238.jpg"
                )

                this.friends.push(fr);

                if (step === total) {
                    this.me = fr;
                    resolve(this.friends);
                } else {
                    setTimeout(() => {
                        genData();
                    }, 100);
                }
            }

            genData();
        })
    }

    public FetchGroupFromDB(): Promise<Group[]> {
        return new Promise((resolve, reject) => {

            if (this.groups.length !== 0)
                resolve(this.groups);

            const total = 10;
            let step = 0;

            const genData = () => {
                step++;

                const n1 = dummyName2[Math.floor(Math.random() * (dummyName.length - 1))];
                const n2 = dummyName2[Math.floor(Math.random() * (dummyName.length - 1))];

                const gr = new Group(
                    this.me!.frId,
                    "https://s120-ava-grp-talk.zadn.vn/6/9/7/1/2/120/c0cfa28d5566967f2f68dc4691d9f32d.jpg",
                    new Date().getTime().toString(),
                    `${n1} ${n2}`,
                )

                this.groups.push(gr);

                if (step === total) {
                    resolve(this.groups);
                } else {
                    setTimeout(() => {
                        genData();
                    }, 100);
                }
            }

            genData();
        })
    }

    public FetchConvFromDB(): Promise<Conversation[]> {
        return new Promise((resolve, reject) => {

            if (this.convs.length !== 0)
                resolve(this.convs);

            for (let index = 0; index < this.friends.length; index++) {
                const fr = this.friends[index];
                this.convs.push(new Conversation(this.me!.frId, fr.dName, false, fr.frId, "", "No preview", fr.avatar));
            }

            for (let index = 0; index < this.groups.length; index++) {
                const gr = this.groups[index];
                this.convs.push(new Conversation(this.me!.frId, gr.groupName, false, "g" + gr.groupId, "", "No preview", gr.avatar));
            }

            resolve(this.convs);
        })
    }
}

export default new LocalData();