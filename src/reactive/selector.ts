import { useSelector } from "react-redux";
import { reactiveAdaptor } from "./adaptor";
import { createSelector } from "reselect";
import { RADefaultSelector, ISelector, SelectorOption } from "./type";
import { useEffect } from "react";
import { MountInfoType } from ".";


/**
 * A hook to access Reactive Adaptor store's. This hook help you get real data from manager
 * as well as trigger render whenever data change.
 * 
 * With no selector provide, this hook will listen change and return full data of item with key provided.
 * With no option provide, this hook will use defaulf equalityFn which use do a ref comparison to
 * decide force to re-render.
 * 
 * @param _manager the manager item belong to
 * @param _key key to identity item in your manager
 * @param _selector the selector function
 * @param _options the function that will be used to determine equality
 * @returns the selected state
 */
export function useItem(
    _manager: string,
    _key: string,
    _selector: ISelector<any, any> = RADefaultSelector,
    _options: SelectorOption = {}
) {

    UpdateMountInfo("i", _key);
    return useSelector(
        selectorFactory("items", _manager, _key, _selector, _options),
        _options.equalityFn
    );
}

/**
 * A hook to access Reactive Adaptor store's. This hook help you get real data from manager
 * as well as trigger render whenever data change.
 * 
 * With no selector provide, this hook will listen change and return full data of list with key provided.
 * With no option provide, this hook will use defaulf equalityFn which use do a ref comparison to
 * decide force to re-render.
 * 
 * @param _manager the manager list belong to
 * @param _key key to identity list in your manager (a.k.a lisname)
 * @param _selector the selector function
 * @param _options the function that will be used to determine equality
 * @returns the selected state
 */
export function useList(
    _manager: string,
    _key: string,
    _selector: ISelector<any, any> = RADefaultSelector,
    _options: SelectorOption = {}
) {

    UpdateMountInfo("l", _key);
    return useSelector(
        selectorFactory("lists", _manager, _key, _selector, _options),
        _options.equalityFn
    );
}

//
// Begin Internal utils ===========================================================
//

function UpdateMountInfo(type: MountInfoType, key: string) {
    const _key = `${type}${key}`;
    useEffect(() => {
        reactiveAdaptor.itemMount(_key);
        return () => {
            reactiveAdaptor.itemUnmount(_key);
        }
    }, [_key])
}

const selectorFactory = (() => {
    const selectors = new Map();

    return function (
        _type: string,
        _manager: string,
        _key: string,
        _selector: ISelector<any, any>,
        _options: SelectorOption
    ) {

        if (typeof _selector !== 'function') {
            _options = _selector;
            _selector = RADefaultSelector;
        }

        const storeKey = _type + _manager + _key + _selector;
        if (selectors.has(storeKey))
            return selectors.get(storeKey);

        const rSelector = createSelector(
            state => (state as any)[_manager][_type][_key],
            meta => {
                return _selector(
                    _type === "items"
                        ? reactiveAdaptor.getItem(_manager, meta, _options.getOption)
                        : reactiveAdaptor.getList(_manager, meta, _options.getOption)
                );
            }
        )
        selectors.set(storeKey, rSelector);
        return rSelector;
    }
})();

//
// End Internal utils ===========================================================
//