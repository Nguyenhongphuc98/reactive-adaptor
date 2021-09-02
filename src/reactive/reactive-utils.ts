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