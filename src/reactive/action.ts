import { IDataManager, reactiveAdaptor, StateType } from ".";
import { ActionType, fullActionType } from "./type";


var store: any;
export function configStore(_store: any) {
    store = _store;
}

export function signalRenderItem(manager: string, key: string) {
    if (!reactiveAdaptor.shouldSignal("i", key))
        return;

    store.dispatch({
        type: fullActionType(manager, ActionType.ITEM_CHANGED),
        payload: { key: key }
    })
}

export function signalRenderList(manager: string, listName: string) {
    if (!reactiveAdaptor.shouldSignal("l", listName))
        return;

    store.dispatch({
        type: fullActionType(manager, ActionType.LIST_CHANGED),
        payload: { key: listName }
    })
}

export function signalAddItem(manager: string, key: string, extra?: any) {
    store.dispatch({
        type: fullActionType(manager, ActionType.ITEM_ADDED),
        payload: {
            key: key,
            extraData: extra
        }
    })
}

export function signalAddList(manager: string, listName: string, extra?: any) {
    store.dispatch({
        type: fullActionType(manager, ActionType.LIST_ADDED),
        payload: {
            key: listName,
            extraData: extra
        }
    })
}

export function signalRemoveItem(manager: string, key: string) {
    store.dispatch({
        type: fullActionType(manager, ActionType.ITEM_REMOVE),
        payload: { key: key }
    })
}

export function signalRemoveList(manager: string, listName: string) {
    store.dispatch({
        type: fullActionType(manager, ActionType.LIST_REMOVE),
        payload: { key: listName }
    })
}

export function getState() {
    return store.getState();
}

export function getManagerOf(type: StateType, key: string): IDataManager | undefined {
    for (let index = 0; index < reactiveAdaptor.managers.length; index++) {
        const m = reactiveAdaptor.managers[index];
        if (store.getState()[m.name][type][key])
            return m;
    }
}