import {useSelector, DefaultRootState} from "react-redux";
import {reactiveAdaptor} from "./reactive-adaptor";

export function useItem(_manager: string, _key: string) {
 
    const meta = useSelector(state=> (state as any)[_manager].items[_key]);
    if (!meta) return {};

    const {key, extraData} = meta;
    return reactiveAdaptor.getItem(_manager, key, extraData);
}

export function useList(_manager: string, _key: string) {
    
    const meta = useSelector(state => (state as any)[_manager].lists[_key]);
    if (!meta) return {};

    const {key, extraData} = meta;
    const lid = reactiveAdaptor.getList(_manager, key, extraData);
    return lid;
}