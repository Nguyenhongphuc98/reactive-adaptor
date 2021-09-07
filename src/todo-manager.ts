
import {
    IDataManager,
    signalAddList,
    signalAddItem,
    signalRenderItem,
    signalRenderList
} from "./reactive";
import { StatePiece } from "./reactive/type";

let gid = 0;

class TodoItem {
    tid: string;
    name: string;
    complete: boolean;

    constructor(name: string) {
        this.tid = (gid++).toString();
        this.name = name;
        this.complete = false;
    }
}

function createTodoItem(name: string) {
    return new TodoItem(name);
}

class TodoManager implements IDataManager {

    name: string;
    key: string | string[];

    todos: TodoItem[];
    completed: TodoItem[];
    cachedtodos: TodoItem[];

    constructor() {
        this.name = "todo";
        this.key = "tid";
        this.todos = [];
        this.completed = [];
        this.cachedtodos = [
            createTodoItem('Go to school'),
            createTodoItem('Have lunch'),
            createTodoItem('Sleeping'),
            createTodoItem('Do homework'),
            createTodoItem('Go to school'),
            createTodoItem('Listen to music')
        ];
    }

    getItem(meta: StatePiece, options: any) {
        const { listName } = meta.extraData;
        const list = listName === 'all' ? this.todos : this.completed;
        return Object.assign({}, list.find(td => td.tid === meta.key));
    }

    getList(meta: StatePiece, extoptionsra: any) {
        const list = meta.key === 'all' ? this.todos : this.completed;
        return list.map(t => t.tid);
    }

    markcomplete(tid: string) {
        const item = this.todos.find(td => td.tid === tid);
        if (!item) return;
        item.complete = true;
        this.completed.push(item);
        signalRenderItem(this.name, tid);
        signalRenderList(this.name, 'complete');
    }

    fetchTodo() {
        this.todos = this.cachedtodos.map(td => {
            signalAddItem(this.name, td.tid, {listName: 'all'});
            return { ...td };
        });
        signalAddList(this.name, 'all');
        signalAddList(this.name, 'complete');
    }
}

export default new TodoManager();