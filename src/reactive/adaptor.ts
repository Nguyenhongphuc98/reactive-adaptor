import { ActionType, fullActionType, RAAction, IDataManager } from "./type";

const ManagerInitState = {
    items: {},
    lists: {}
}


class ReactiveAdaptor {

    managers: IDataManager[];

    constructor() {
        this.managers = [];
    }

    public registerDataManager(manager: IDataManager) {
        if (this._getManager(manager.name)) {
            console.error("Register duplicate manager", manager.name);
            return;
        }
        this.managers.push(manager);
    }

    public createReducer() {
        const reducers = {};
        for (let index = 0; index < this.managers.length; index++) {
            const manager = this.managers[index];
            const reducer = this._createReducer(manager);
            const piece: any = {};
            piece[manager.name] = reducer;
            Object.assign(reducers, piece);
        }
        return reducers;
    }

    public getItem(manager: string, meta: any, options?: any): any {
        const _m = this._getManager(manager);
        if (!_m) return undefined;
        return _m.getItem(meta, options);
    }

    public getList(manager: string, meta: any, options?: any): any {
        const _m = this._getManager(manager);
        if (!_m) return undefined;
        return _m.getList(meta, options);
    }

    private _getManager(name: string) {
        return this.managers.find(m => m.name === name);
    }

    private _createReducer(manager: IDataManager) {
        const reducer = (state: any = ManagerInitState, action: RAAction) => {
            const newState = { ...state };
            const { type, payload } = action;

            switch (type) {

                case fullActionType(manager.name, ActionType.ITEM_CHANGED):
                    newState.items[payload.key] = {
                        ...state.items[payload.key],
                        version: state.items[payload.key].version + 1
                    };
                    break;
                case fullActionType(manager.name, ActionType.LIST_CHANGED):
                    newState.lists[payload.key] = {
                        ...state.lists[payload.key],
                        version: state.lists[payload.key].version + 1
                    };
                    break;
                case fullActionType(manager.name, ActionType.ITEM_ADDED):
                    newState.items[payload.key] = {
                        key: payload.key,
                        version: 0,
                        extraData: payload.extraData
                    };
                    break;
                case fullActionType(manager.name, ActionType.LIST_ADDED):
                    newState.lists[payload.key] = {
                        key: payload.key,
                        version: 0,
                        extraData: payload.extraData
                    };
                    break;
                case fullActionType(manager.name, ActionType.ITEM_REMOVE):
                    delete newState.items[payload.key];
                    break;
                case fullActionType(manager.name, ActionType.LIST_REMOVE):
                    delete newState.lists[payload.key];
                    break;
                default:
                    break;
            }

            return newState;
        }

        return reducer;
    }
}

const reactiveAdaptor = new ReactiveAdaptor();
export { reactiveAdaptor };
export type { IDataManager };