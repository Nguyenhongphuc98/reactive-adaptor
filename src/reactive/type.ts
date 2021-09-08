
/**
 * Action //////////////////////////////////////////////////////////////
 */
export const ActionType = Object.freeze({
    ITEM_CHANGED: "ITEM_CHANGED",
    LIST_CHANGED: "LIST_CHANGED",
    ITEM_ADDED: "ITEM_ADDED",
    LIST_ADDED: "LIST_ADDED",
    ITEM_REMOVE: "ITEM_REMOVE",
    LIST_REMOVE: "LIST_REMOVE",
})

export type RAPayload = {
    key: string,
    extraData?: Object
}

export type RAAction = {
    type: string
    payload: RAPayload
}

export function fullActionType(manager: string, type: string) {
    return `${manager}_${type}`;
}

/**
 * Selector //////////////////////////////////////////////////////////////
 */
export type ISelector<S, R> = (state: S) => R;
export type SelectorOption<TSelected = unknown> = {
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
    getOption?: any
}
export const RADefaultSelector = (data:any) => data;


/**
 * Data //////////////////////////////////////////////////////////////
 */
export type StatePiece = {
    key: string,
    version: number
    extraData: any
}

export type StateType  = "lists" | "items";

export interface IDataManager {
    name: string;
    key: string | string[];

    getItem(meta: StatePiece, options: any): any;
    getList(meta: StatePiece, options: any): string[];
}