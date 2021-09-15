import { IDataManager, reactiveAdaptor, StateType } from ".";
import { ActionType, fullActionType } from "./type";


var store: any;
export function configStore(_store: any) {
    store = _store;
}


/**
 * An action that trigger a state change to UI if `item` is showing on (being used by) any UI component
 * @param manager Name of manager handle `item`
 * @param key Key of `item` in RA's Store
 * @returns No value return
 */
export function signalRenderItem(manager: string, key: string) {
    if (!reactiveAdaptor.shouldSignal("i", key))
        return;

    store.dispatch({
        type: fullActionType(manager, ActionType.ITEM_CHANGED),
        payload: { key: key }
    })
}

/**
 * An action that trigger a state change to UI if `list` is showing on (being used by) any UI component
 * @param manager Name of manager handle `list`
 * @param listName Key of `list` in RA's Store
 * @returns No value return
 */
export function signalRenderList(manager: string, listName: string) {
    if (!reactiveAdaptor.shouldSignal("l", listName))
        return;

    store.dispatch({
        type: fullActionType(manager, ActionType.LIST_CHANGED),
        payload: { key: listName }
    })
}

/**
 * An action that add `item` to RA's store and trigger a state change to UI
 * @param manager Name of manager handle `item`
 * @param key Key of `item` in RA's Store
 * @param extra Object hold any data you want to store it in RA's store
 * @returns No value return
 */
export function signalAddItem(manager: string, key: string, extra?: any) {
    store.dispatch({
        type: fullActionType(manager, ActionType.ITEM_ADDED),
        payload: {
            key: key,
            extraData: extra
        }
    })
}

/**
 * An action that add `list` to RA's store and trigger a state change to UI
 * @param manager Name of manager handle `list`
 * @param listName Key of `list` in RA's Store
 * @param extra Object hold any data you want to store it in RA's store
 * @returns No value return
 */
export function signalAddList(manager: string, listName: string, extra?: any) {
    store.dispatch({
        type: fullActionType(manager, ActionType.LIST_ADDED),
        payload: {
            key: listName,
            extraData: extra
        }
    })
}

/**
 * An action that remove `item` out RA's store and trigger a state change to UI
 * @param manager Name of manager handle `item`
 * @param key Key of `item` in RA's Store
 * @returns No value return
 */
export function signalRemoveItem(manager: string, key: string) {
    store.dispatch({
        type: fullActionType(manager, ActionType.ITEM_REMOVE),
        payload: { key: key }
    })
}

/**
 * An action that remove `list` out RA's store and trigger a state change to UI
 * @param manager Name of manager handle `list`
 * @param listName Key of `list` in RA's Store
 * @returns No value return
 */
export function signalRemoveList(manager: string, listName: string) {
    store.dispatch({
        type: fullActionType(manager, ActionType.LIST_REMOVE),
        payload: { key: listName }
    })
}

/**
 * An action that update extraData of `item` in RA's store and trigger a state change to UI.
 * If you only want to trigger UI, user `signalRenderItem` instead
 * @param manager Name of manager handle `item`
 * @param key Key of `item` in RA's Store
 * @param extra Object hold any data you want to store it in RA's store
 * @returns No value return
 */
export function signalUpdateItem(manager: string, key: string, extra: any) {
    store.dispatch({
        type: fullActionType(manager, ActionType.ITEM_UPDATE),
        payload: {
            key: key,
            extraData: extra
        }
    })
}

/**
 * An action that update extraData of `list` in RA's store and trigger a state change to UI.
 * If you only want to trigger UI, user `signalRenderList` instead
 * @param manager Name of manager handle list
 * @param listName Key of list in RA's Store
 * @param extra Object hold any data you want to store it in RA's store
 * @returns No value return
 */
export function signalUpdateList(manager: string, listName: string, extra: any) {
    if (!reactiveAdaptor.shouldSignal("l", listName))
        return;

    store.dispatch({
        type: fullActionType(manager, ActionType.LIST_UPDATE),
        payload: {
            key: listName,
            extraData: extra
        }
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