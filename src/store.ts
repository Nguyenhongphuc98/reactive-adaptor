import { createStore, combineReducers } from 'redux';
import { reactiveAdaptor, configStore } from './reactive';
import chatManager from './manager/chat-manager';
import groupManager from './manager/group-manager';
import friendManager from './manager/friend-manager';

reactiveAdaptor.registerDataManager(chatManager);
reactiveAdaptor.registerDataManager(groupManager);
reactiveAdaptor.registerDataManager(friendManager);

const raReducer = reactiveAdaptor.createReducer();

const rootReducer = combineReducers({ ...raReducer });

export const store = createStore(rootReducer);
configStore(store);
