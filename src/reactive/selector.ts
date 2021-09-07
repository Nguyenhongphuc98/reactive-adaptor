import { useSelector } from "react-redux";
import { reactiveAdaptor } from "./adaptor";
import { createSelector } from "reselect";
import { RADefaultSelector, ISelector, SelectorOption } from "./type";


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
    if (typeof _selector !== 'function') {
        _options = _selector;
        _selector = RADefaultSelector;
    }
    const selector = createSelector(
        state => (state as any)[_manager].items[_key],
        meta => {
            return _selector(reactiveAdaptor.getItem(_manager, meta, _options.getOption));
        }
    )

    return useSelector(selector, _options.equalityFn);
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
    if (typeof _selector !== 'function') {
        _options = _selector;
        _selector = RADefaultSelector;
    }
    const selector = createSelector(
        state => (state as any)[_manager].lists[_key],
        meta => {
            return _selector(reactiveAdaptor.getList(_manager, meta, _options.getOption));
        }
    )

    return useSelector(selector, _options.equalityFn);
}