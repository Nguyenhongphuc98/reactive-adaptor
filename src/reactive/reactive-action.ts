import { ActionType, fullActionType } from "./reactive-utils";


var store: any;

export function configStore(_store: any) {
    store = _store;
}

export function signalRenderItem(manager: string, key: string) {
    store.dispatch({
        type: fullActionType(manager, ActionType.ITEM_CHANGED),
        payload: { key: key }
    })
}

export function signalRenderList(manager: string, listName: string) {
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
